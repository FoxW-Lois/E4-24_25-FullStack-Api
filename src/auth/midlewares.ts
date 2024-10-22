import express from "express";
import { StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";
import { DbUser } from "./db/models";
import { TokenUser } from "./models";

export const checkAuth = async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    const accessToken = req.signedCookies[process.env.JWT_ACCESS_TOKEN_NAME!];
    if (!accessToken) {
        // Si le token d'accès est absent, redirige pour essayer de renouveler le token d'accès
        return res.redirect('/refresh-token');
    }
    try {
        const user = verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET!) as TokenUser;
        
        const dbUser = await DbUser.findOne({email:user.email});       
        if(!dbUser) {
            next(StatusCodes.UNAUTHORIZED);
            return;
        }
        if(dbUser.expiredTokens.includes(accessToken)) {
            next(StatusCodes.UNAUTHORIZED);
            return;
        }

        req.accessToken = accessToken;
        req.user = { email : user.email };
    
        next();
    } catch (error) {
        res.redirect('/refresh-token');
    }
}