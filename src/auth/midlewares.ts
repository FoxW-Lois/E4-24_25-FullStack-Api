import express from "express";
import { StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";
import { DbUser } from "./db/models";
import { TokenUser } from "./models";

export const checkAuth = async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    const token = req.signedCookies[process.env.JWT_ACCESS_TOKEN_NAME!];
    if(!token) {
        next(StatusCodes.UNAUTHORIZED);
        return;
    }
    try {
        const user = verify(token, process.env.JWT_ACCESS_TOKEN_SECRET!) as TokenUser;
        
        const dbUser = await DbUser.findOne({email:user.email});       
        if(!dbUser) {
            next(StatusCodes.UNAUTHORIZED);
            return;
        }
        if(dbUser.expiredTokens.includes(token)) {
            next(StatusCodes.UNAUTHORIZED);
            return;
        }

        req.accessToken = token;
        req.user = {
            email : user.email
        };
    
        next();
    } catch (error) {
        next(StatusCodes.UNAUTHORIZED);
    }
}