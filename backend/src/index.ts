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
const authenticateToken = async (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers['authorization']
    if(token == null) return res.sendStatus(401)
    try {
        const decoded = await jwt.verify(token, secret_key)
        next()
    } catch (error) {
        res.status(403).json({message:"wrong token"})
    }
}
app.post('/posts', authenticateToken, async (req: Request, res: Response) => {
    const {title, content, userId} = req.body
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
    const token = await jwt.sign({email: user.email}, secret_key)    
    res.status(200).json({message: `success login ${isAMatch}`, jwt: token})
    } catch (error) {
        res.json(error)
    }
 })

