import express, {type NextFunction, type Response, type Request, type Errback} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import requiresLoggedIn from "./middlewares/requiresLoggedIn.js";
import userRouter from "./routes/user.routes.js";
import {prisma} from "./lib/prisma.js";
const app = express()
const port = process.env.PORT || 3000;

declare global {
    namespace Express {
        interface Request {
            user?: {
                name: string
                username: string
                password: string
                id: number
            }
            // You can add other properties here too
            // customHeaderStr?: string;
        }
    }
}

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
let reqs = 0;
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(++reqs, req.method, req.url, "from", req.get("Referer"))
    next();
})
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.get('/secret', requiresLoggedIn, (req, res) => {
    res.send('secret');
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log("====env variables====:")
    console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`)
    console.log(`JWT_SECRET: ${process.env.JWT_SECRET}`)
    console.log(`FRONTEND_URL: ${process.env.FRONTEND_URL}`)
})

app.use((err : Errback , req : Request , res : Response ,  next : NextFunction) => {
    console.log(err);
    res.status(500).json({
        success: false,
        message: "something went wrong",
    })
})