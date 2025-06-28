import type { Request, Response } from "express";
import bcrypt from 'bcryptjs'
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

app.post('/posts', async (req: Request, res: Response) => {
    const {title, content} = req.body
    const addedPost = await prisma.post.create({
        data: {
            title,
            content
        }
    })
    await delay(2000)
    res.json(addedPost)
})

app.post('/posts/:postId', async(req:Request, res:Response) => {
    const postId = req.params.postId
    const {title, content} = req.body
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
    const posts = await prisma.post.findMany()
    await delay(2000)
    res.json(posts)
})

app.get('/posts/:postId', async(req:Request, res: Response) => {
    const postId = req.params.postId
    const post = await prisma.post.findUnique({
        where: {
            id: postId
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
    res.status(201).json({message: "user created successfully"})
   } catch (error:any) {
        if(error.code === "P2002") return res.status(409).json({message: "Email already exits"}) //conflict
        res.status(500).json({message:"some error"})
   }
})

 app.post('/login', async (req:Request, res: Response) => {
    const {email, password} = req.body
    try {
        const user = await prisma.user.findUnique({
        where: {
            email
        },
        select: {
            password:true
        }
        })
    if(!user) return  res.status(401).json({message: 'invalid credentials no such user'})
    const isAMatch = await bcrypt.compare(password, user.password)
    if(!isAMatch) return res.status(401).json({message: "invalid credentials wrong password"})
    res.status(200).json({message: `success login ${isAMatch}`})
    } catch (error) {
        res.json(error)
    }
 })

//   app.post('/login', async (req:Request, res: Response) => {
//     const {email, password} = req.body
//     try {
//         //const {password: hashedPassword} = await prisma.user.findUnique({
//         const {password: hashedPassword} = await prisma.user.findUnique({ 
//          //the problem with destructuring inline here is that 
            //suppose theres no matching user our hashedPassword would be an empty object
            //our if check for when its false would never be encountered
            //but if we just get whatever it return and no destructure the value would be null
//         where: {
//             email
//         },
//         select: {
//             password:true
//         }
//         })
//     //if(!hashedPassword) return  res.status(401).json({message: 'invalid credentials no such user'})
//     //const isAMatch = await bcrypt.compare(password, hashedPassword)
//     //if(!isAMatch) return res.status(401).json({message: "invalid credentials wrong password"})
//     res.json(user)
//     } catch (error) {
//         res.json(error)
//     }
//  })
// app.post('/register' async (req:Request, res: Response) => {
//     const {email, password, name} = req.body
//     await bcrypt.hash(password, 10,  function(err, hash) {
        //here we using async and using a callback
        //istead we should await and then run whatever we wait
//         const user = await prisma.user.create({
//             data: {
//                 email,
//                 name,
//                 password:hash
//             }
//         })
//     }) 
//     res.json(user)

// })
