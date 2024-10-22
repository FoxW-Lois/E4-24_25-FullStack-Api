import { compare, hash } from "bcrypt";
import express, { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { sign } from "jsonwebtoken";
import { DbUser } from "./db/models";
import { checkAuth } from "./midlewares";
import { TokenUser } from "./models";

declare module "express" {
    export interface Request {
        accessToken? : string,
        user? : TokenUser
    }
};

export const createAuthRoutes = () => {
    const authRoutes = Router();
    authRoutes.post("/signup", async (req : express.Request, res : express.Response,next: express.NextFunction) => {
    const {email, password, confirmPassword} = req.body;
        if(!email || !password || (password !== confirmPassword)) {
            next(StatusCodes.BAD_REQUEST);
            return;
        }
        
        try {
            const newUser = new DbUser({
                email,
                password : await hash(password, 12)
            });
            await newUser.save();
            next(StatusCodes.CREATED);
        } catch (error) {
            next(error);
        }
    })

    authRoutes.post("/login", async (req : express.Request, res : express.Response,next: express.NextFunction) => {
        
        const {email, password} = req.body;
        try {
            const dbUser = await DbUser.findOne({email})        
            if(!dbUser) {
                next(StatusCodes.UNAUTHORIZED);
                return;
            }
            
            if(!await compare(password, dbUser.password)) {
                next(StatusCodes.UNAUTHORIZED);
                return;
            }

            const user = {
                id : dbUser._id,
                email : dbUser.email
            };

            const token = sign(user, process.env.JWT_ACCESS_TOKEN_SECRET!, { expiresIn : process.env.JWT_ACCESS_TOKEN_LIFETIME! });
            res.cookie(process.env.JWT_ACCESS_TOKEN_NAME!, token, {
                secure: process.env.NODE_ENV === "production",
                signed : true,
                httpOnly : true,
            });
            res.sendStatus(StatusCodes.OK);
        } catch (error) {
            next(error);
        }
    })

    authRoutes.all("/logout",checkAuth, async (req : express.Request, res : express.Response) => {
        const dbUser = await DbUser.findOne({email:req.user!.email});
        dbUser!.expiredTokens.push(req.accessToken! as string);
        await dbUser!.save();
        req.accessToken = undefined;
        req.user = undefined;
        res.clearCookie(process.env.JWT_ACCESS_TOKEN_NAME!);
        res.sendStatus(StatusCodes.OK);
    });

    return authRoutes;
}