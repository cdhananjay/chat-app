import {type Request, type Response, Router} from 'express'
import requiresLoggedIn from "../middlewares/requiresLoggedIn.js";
import {prisma} from "../lib/prisma.js";
const userRouter = Router()

userRouter.get("/", requiresLoggedIn , async (req: Request, res: Response) => {
    res.send({
        success: true,
        message: 'User found successfully.',
        user: {
            id : req.user?.id,
            name : req.user?.name,
            username : req.user?.username,
        },
    })
})

export default userRouter;