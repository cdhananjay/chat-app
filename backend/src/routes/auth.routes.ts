import {type Request, type Response, Router} from 'express'
import jwt from "jsonwebtoken"
import {prisma} from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import requiresLoggedIn from "../middlewares/requiresLoggedIn.js";
import requiresLoggedOut from "../middlewares/requiresLoggedOut.js";
const authRouter = Router()

authRouter.post('/register', requiresLoggedOut, async (req : Request, res : Response) => {
    const { name, username, password } = req.body;
    if (!username || !password || !password) {
        return res.status(401).json({
            success: false,
            message: "all fields are required"
        })
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const existingUser = await prisma.user.findUnique({
        where: {username: username}
    })
    if (existingUser) {
        return res.status(401).json({
            success: false,
            message: "username already exist"
        })
    }
    const user = await prisma.user.create({
        data: {
            name: name,
            username: username,
            password: hash,
        }
    })
    let token = jwt.sign({username},  process.env.JWT_SECRET!)
    res.cookie("token", token)
    res.json({
        success: true,
        message: "User registered successfully"
    })
})

authRouter.post('/login', requiresLoggedOut, async (req : Request, res : Response) => {
    const {username, password} = req.body;
    const user = await prisma.user.findUnique({
        where: {username: username}
        }
    )
    if (user && bcrypt.compareSync(password, user.password)){
        let token = jwt.sign({username}, process.env.JWT_SECRET!)
        res.cookie("token", token)
        return res.json({
            success: true,
            message: "User logged in successfully"
        })
    }
    res.json({
        success: false,
        message: "invalid username or password",
    })
})

authRouter.post('/logout', requiresLoggedIn, (req :Request, res :Response) => {
    res.clearCookie("token")
    res.json({
        success: true,
        message: 'logged out',
    })
})

export default authRouter;