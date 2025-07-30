import type { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs'
import 'dotenv/config'
const secret_key = process.env.TOKEN_SECRET
var jwt = require('jsonwebtoken');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
function delay(duration: number){
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
    }
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

app.get('/posts', async(req:Request, res: Response) => {
    const posts = await prisma.post.findMany({
        include: {
            user:{
                select: {
                    name:true
                }
            }
        }
    })
    await delay(2000)
    res.json(posts)
})

app.get('/posts/:postId', async(req:Request, res: Response) => {
    const postId = req.params.postId
    const post = await prisma.post.findUnique({
        //incorrect way 
        //saw some syntax related to this in relation queries - relation filters
        // where: {
        //     id: postId,
        //     include: {
        //         user: {
        //             select: {
        //                 name:true
        //             }
        //         }
        //     }
        // }
        where: {
            id: postId,
        },
        include: {
            user: {
                select: {
                    name:true
                }
            }
        }
    })
    await delay(2000)
    res.json(post)
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

