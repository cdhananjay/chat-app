import express, {type NextFunction, type Response, type Request, type Errback} from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import requiresLoggedIn from "./middlewares/requiresLoggedIn.js";
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/api/auth', authRouter);

app.get('/secret', requiresLoggedIn, (req, res) => {
    res.send('secret');
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use((err : Errback , req : Request , res : Response ,  next : NextFunction) => {
    console.log(err);
    res.status(500).json({
        success: false,
        message: "something went wrong",
    })
})