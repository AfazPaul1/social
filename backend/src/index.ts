import type { Request, Response } from "express";
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.listen(3000, () => console.log('Server running on http://localhost:3000'));

app.post('/addPosts', async (req: Request, res: Response) => {
    const {title, content} = req.body
    const addedPost = await prisma.post.create({
        data: {
            title,
            content
        }
    })
    res.json(addedPost)
})