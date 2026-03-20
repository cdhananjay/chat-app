import type {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {prisma} from "../lib/prisma.js";

const requiredLoggedIn= async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "user must be logged in"
        })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {username: string};
    const user = await prisma.user.findUnique({
        where: {username: decoded.username},
    })
    if (!user) {
        res.clearCookie("token");
        return res.status(401).json({
            success: false,
            message: "user had invalid cookies which are now cleared, login again",
        })
    }
    next();
}

export default requiredLoggedIn;