import type { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs'
import 'dotenv/config'
import { Prisma, ReactionType } from "@prisma/client";
const secret_key = process.env.TOKEN_SECRET
var jwt = require('jsonwebtoken');
const express = require('express');
import prisma from './lib/prisma'
import {optionalAuth} from './middleware/auth.middleware'
const cors = require('cors')
const app = express();
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : []
app.use(cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
}));
app.use(express.json());
const PORT = process.env.PORT || 3000; 
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});function delay(duration: number){
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
}
//add a custom property to the request
//Extending the Express Request interface locally
export interface modRequest extends Request {
    user?: {
        id:string,
        role: "USER" | "MODERATOR" | "ADMIN"
    } | null
}
const authenticateToken = async (req:modRequest, res:Response, next:NextFunction) => {
    const token = req.headers['authorization']
    if(token == null) return res.sendStatus(401)
    try {
        const decoded = await jwt.verify(token, secret_key)
        const user = await prisma.user.findUnique({
            where:{
                id:decoded.id
            }
        })
        if(!user) return res.status(401).json({message: "no such user"}) 
        // req.body.userId = user.id
        // req.body.role = user.role
        req.user = {id: user.id, role: user.role}
        //console.log(req.body);
        next()
    } catch (error) {
        res.status(403).json({message:"wrong token"})
    }
}

//ig what i needed for now was just an ownership test for which i dont actually require roles
// i just needed to know whether a post's author was the current logged in user
//maybe later
// const authorization = (permittedRole: "USER" | "ADMIN" | "MODERATOR") => {
//     return async (req:Request, res:Response, next:NextFunction) => {
        
//     }
// }
//add new post
app.post('/posts', authenticateToken, async (req: modRequest, res: Response) => {
    const {title, content} = req.body
    //at this point user wont be null cause the middleware would have thrown an error and returned if it were the case
    //but read that type narrowing(defensive programming with explicit checks would be better)
    //const {id:userId} = req.user //this would throw an error cause user could be null cause its optional
    //i made it optional cause i was aiming for Extending the Express Request type globally in TypeScript
    //i could make it not optional in Extending the Express Request interface locally cause im typing only where needed with the customised Request and not everywhere
    //but if i am globally modifying the Request using declaration merging i would need to cause we dont use the middleware everywhere where as we use the request everywhere
    const {id:userId} = req.user!
    const addedPost = await prisma.post.create({
        data: {
            title,
            content,
            userId,
        }
    })
    await delay(2000)
    res.json(addedPost)
})
//edit post
app.patch('/posts/:postId',authenticateToken, async(req:modRequest, res:Response) => {
    const postId = req.params.postId
    const {title, content} = req.body
    const {id:userId} = req.user!
    const post =  await prisma.post.findUnique({
        where: {
            id: postId
        }
    })
    if (post.userId !== userId) return res.status(403).json({message: "Forbidden: you cannot edit another user's post"})
    const updatedPost = await prisma.post.update({
        where: {
            id: postId
        },
        data:{
            title,
            content
        }
    })
    await delay(2000)
    res.json(updatedPost)
})

app.get('/posts', optionalAuth ,async(req:modRequest, res: Response) => {
    const currentUserId = req.user?.id    
    const posts = await prisma.post.findMany({
        include: {
            user:{
                select: {
                    name:true
                }     
            },
            ...(currentUserId && { //conditional include using spread
                reactions: {
                where: { userId: currentUserId },
                select: { type: true }, 
                },
            }) 
        }
    })
    
    //abandoned cause read that shape the response, instead of mutating DB objects
    // if (currentUserId) {
    //     posts = posts.map((post:any) => {
    //         const userReaction = post.reactions[0]?.type || null
    //         delete post.reactions //i havent verified whether this is an actual performance improvement over destructuring
    //         post.userReaction = userReaction
    //         return post
    //     })
    // }
    
    const postIds = posts.map((p:any) => p.id)
    const rawCounts = await prisma.Reaction.groupBy({
        by:['postId', 'type'],
        where:{
            postId : {
                in: postIds
            }
        },
        _count:{
            type:true
        }

    })
    const countsMap = new Map<string, Record<ReactionType, number>>()
    rawCounts.forEach((item:any) => {
        
        
        if(!countsMap.has(item.postId)) {
            countsMap.set(item.postId, {
                "SAD":0,
                "ANGRY":0,
                "WOW":0,
                "HAHA":0,
                "LOVE":0,
                "LIKE":0,   
            })
        }
        const record = countsMap.get(item.postId)!
        record[item.type as ReactionType] = item._count.type
    })
    function formatPost(post:any)
    {   
        return (
            {
            id:post.id,
            title:post.title,
            content:post.content,
            createdAt:post.createdAt,
            updatedAt:post.updatedAt,
            userId:post.userId,
            userName: post.user.name,
            userReaction:post.reactions?.[0]?.type || null, //reactions wont exist if user not logged in
            reactionCounts:countsMap.get(post.id)  
        }
        )
    } 
    const modifiedPosts = posts.map((post:any) => {
        return formatPost(post)
    }) 
    await delay(2000)
    res.json(modifiedPosts)
})
type reactionCounts = Record<ReactionType, number>
app.get('/posts/:postId', async(req:Request, res: Response) => {
    const postId = req.params.postId
    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
        include: {
            user: {
                select: {
                    name:true
                }
            },
           //reactions:true this returns all reaction but we just need the count
        }
    })
    // const reactionCounts = await prisma.reaction.findMany({
    //     where: {
    //         postId
    //     }
    // }) cant use findmany here this would just give all reaction then we would have to count manually
    const reactionCounts = await prisma.reaction.groupBy({
        by:'type',
        where: {
            postId
        },
        _count:{
            type:true
        }
    })

//     interface reactionCountsType {
//     "SAD":number,
//     "ANGRY":Number,
//     "WOW":Number,
//     "HAHA":Number,
//     "LOVE":Number,
//     "LIKE":Number,
// }
//     const reactionCountsNew:reactionCountsType = {
//         "SAD":0,
//         "ANGRY":0,
//         "WOW":0,
//         "HAHA":0,
//         "LOVE":0,
//         "LIKE":0,
//     }
//     const keys = Object.keys(reactionCounts)
//     for (const key in keys) {
//         reactionCountsNew[reactionCounts[key].type] = reactionCounts[keys[0]]._count.type;         //this is causing a error cause reactionCountsNew.value can be only those 6 values but we are not gauranteed that reactionCounts[key].type will certainly only give those 6 values cause we dont know its types
//     }

    const formattedCounts:reactionCounts = {
        SAD:0,
        ANGRY:0,
        WOW:0,
        HAHA:0,
        LOVE:0,
        LIKE:0,
    }
    //reaction counts was actaully an array i assumed it was an object but it was cause i spread it.
    reactionCounts.forEach((item:any) => {
        formattedCounts[item.type as ReactionType] = item._count.type
    })
    await delay(1000)
    res.json({...post, reactionCounts: formattedCounts})
})


app.post('/register', async (req:Request, res: Response) => {
    
    const {email, password, name} = req.body
    const hash = await bcrypt.hash(password, 10)
    
   try {
     const user = await prisma.user.create({
        data: {
            email,
            name,
            password:hash
        }
    })
    res.status(201).json({message: "Registered Successfully"})
   } catch (error:any) {
        if(error.code === "P2002") return res.status(409).json({message: "Email already exits"}) //conflict
        res.status(500).json({message:"some error"})
   }
})

app.post('/login', async (req:Request, res: Response) => {
    const {email, password} = req.body
    await delay(2000)
    try {
        const user = await prisma.user.findUnique({
        where: {
            email
        }
        })
    
    if(!user) return  res.status(401).json({message: 'invalid credentials no such user'})
    const isAMatch = await bcrypt.compare(password, user.password)
    if(!isAMatch) return res.status(401).json({message: "invalid credentials wrong password"})
    const token = await jwt.sign({id: user.id}, secret_key)    
    res.status(200).json({
        message: `success login ${isAMatch}`, 
        body: {
            user:{
                email:user.email,
                id:user.id,
                name:user.name
            },
            accessToken: token
        }
    })
    } catch (error) {
        res.json(error)
    }
})
type ReactionAction = "CREATED" | "UPDATED" | "DELETED";
interface reactionResponse {

}
app.post('/reaction', authenticateToken ,async (req:modRequest, res: Response) => {
    const {postId, reactionType:type} = req.body
    const {id:userId} = req.user!
    try {
        const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {   
            const {count} =  await tx.reaction.deleteMany({
                where:{
                    userId,
                    postId,
                    type   
                }
            })
            if (count === 1) {
                return {status:200, message:"deleted"}
            }
            const upserted = await tx.reaction.upsert({
                where:{
                    reactionId: {
                        userId,
                        postId,
                    } 
                },
                update: {
                        type
                    },
                create: {
                    userId,
                    postId,
                    type
                }
            })
            return { status: 200, message: "reaction created", body: { upserted } };        
        })
        return res.status(result.status).json({
            message: result.message,
            body:result.body
        })
    } catch (e: any) {
        console.error("Transaction failed:", e.message);
        return res.status(500).json({
            message: "Something went wrong",
            error: e.message
        });
    }  
})


