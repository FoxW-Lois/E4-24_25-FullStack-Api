import { compare, hash } from "bcrypt";
import express, { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { sign, verify } from "jsonwebtoken";
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
    });

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

            // Créer le payload du token d'accès
            const accessTokenPayload = { id: dbUser._id, email: dbUser.email };
            // Créer le token d'accès (expirant après 3 minutes)
            const accessToken = sign(accessTokenPayload, process.env.JWT_ACCESS_TOKEN_SECRET!, { expiresIn: '3m' });
            // Créer le token de renouvellement (expirant après 30 minutes)
            const refreshToken = sign(accessTokenPayload, process.env.JWT_REFRESH_TOKEN_SECRET!, { expiresIn: '30m' });

            // Stocker les tokens dans des cookies sécurisés
            res.cookie(process.env.JWT_ACCESS_TOKEN_NAME!, accessToken, {
                secure: process.env.NODE_ENV === "production",
                signed: true,
                httpOnly: true,
            });

            res.cookie(process.env.JWT_REFRESH_TOKEN_NAME!, refreshToken, {
                secure: process.env.NODE_ENV === "production",
                signed: true,
                httpOnly: true,
            });
            
            res.sendStatus(StatusCodes.OK);
        } catch (error) {
            next(error);
        }
    });

    authRoutes.all("/logout",checkAuth, async (req : express.Request, res : express.Response) => {
        const dbUser = await DbUser.findOne({email:req.user!.email});
        dbUser!.expiredTokens.push(req.accessToken! as string);
        await dbUser!.save();
        req.accessToken = undefined;
        req.user = undefined;
        res.clearCookie(process.env.JWT_ACCESS_TOKEN_NAME!);
        res.sendStatus(StatusCodes.OK);
    });

    authRoutes.post("/refresh-token", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const refreshToken = req.signedCookies[process.env.JWT_REFRESH_TOKEN_NAME!];
        if (!refreshToken) {
            next(StatusCodes.UNAUTHORIZED);
            return;
        }
        
        try {
            const user = verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET!) as TokenUser;
    
            const dbUser = await DbUser.findOne({email: user.email});
            if (!dbUser) {
                next(StatusCodes.UNAUTHORIZED);
                return;
            }
    
            // Créer un nouveau token d'accès (expirant dans 3 minutes)
            const newAccessToken = sign({ id: dbUser._id, email: dbUser.email }, process.env.JWT_ACCESS_TOKEN_SECRET!, { expiresIn: '3m' });
    
            // Met à jour le token d'accès dans les cookies
            res.cookie(process.env.JWT_ACCESS_TOKEN_NAME!, newAccessToken, {
                secure: process.env.NODE_ENV === "production",
                signed: true,
                httpOnly: true,
            });
    
            res.sendStatus(StatusCodes.OK);
        } catch (error) {
            next(StatusCodes.UNAUTHORIZED);
        }
    });
    
    return authRoutes;
}