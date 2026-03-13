import type {modRequest} from '../index'
import type { Request, Response, NextFunction } from "express";
import prisma from '../lib/prisma'
const secret_key = process.env.TOKEN_SECRET
var jwt = require('jsonwebtoken');

export const optionalAuth = async (req:modRequest, res:Response, next:NextFunction) => {
    const token = req.headers['authorization']
    if(!token) {
        req.user=null
        return next()
    }
    try {
        const decoded = await jwt.verify(token, secret_key)
        const user = await prisma.user.findUnique({
            where:{
                id:decoded.id
            }
        })
        if(!user) return res.status(401).json({message: "no such user"}) 
        req.user = {id: user.id, role: user.role}
        next()
    } catch (error) {
        res.status(403).json({message:"wrong token"})
    }
}