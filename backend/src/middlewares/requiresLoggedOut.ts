import type {Request, Response, NextFunction} from "express";
const requiredLoggedOut= async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (token) {
        return res.status(401).json({
            success: false,
            message: `user already logged in, logout first`,
        })
    }
    next();
}

export default requiredLoggedOut;






