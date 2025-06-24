import type { Request, Response } from "express";
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
app.listen(3000, () => console.log('Server running on http://localhost:3000'));

app.post('/posts', async (req: Request, res: Response) => {
    const {title, content} = req.body
    const addedPost = await prisma.post.create({
        data: {
            title,
            content
        }
    })
    res.json(addedPost)
})

app.get('/posts', async(req:Request, res: Response) => {
    const posts = await prisma.post.findMany()
    res.json(posts)
})

app.get('/posts/:postId', async(req:Request, res: Response) => {
    const postId = req.params.postId
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })
    res.json(post)
})