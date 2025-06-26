import type { Request, Response } from "express";
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