import { compare, hash } from 'bcrypt';
import express, { NextFunction, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { decode } from 'jsonwebtoken';
import { DbUser } from './db/models';
import { blackListAccessToken, blackListRefreshToken } from './db/util';
import { checkAccessToken, checkRefreshToken } from './midlewares';
import { TokenUser } from './models';
import { addAccessToken, addRefreshToken, createTokenUser } from './util';
import createHttpError from 'http-errors';

declare module 'express' {
    export interface Request { user?: TokenUser }
}

export const createAuthRoutes = () => {
    const authRoutes = Router();
    authRoutes.post('/signup', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { email, password, confirmPassword } = req.body;
        if (!email || !password || password !== confirmPassword) {
            next(createHttpError(StatusCodes.BAD_REQUEST));
            return;
        }

        try {
            const newUser = new DbUser({email, password: await hash(password, 12)});
            await newUser.save();
            res.sendStatus(StatusCodes.CREATED);
        } catch (error) {
            console.log(error);
            next(error);
        }
    })

    authRoutes.post('/login', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { email, password } = req.body;
        try {
            const dbUser = await DbUser.findOne({ email });

            if (!dbUser) {
              next(createHttpError(StatusCodes.UNAUTHORIZED));
              return;
            }

            if (!(await compare(password, dbUser.password))) {
              next(createHttpError(StatusCodes.UNAUTHORIZED));
              return;
            }

            const user = await createTokenUser(dbUser, req);
            const accessToken : string = req.signedCookies[process.env.JWT_ACCESS_TOKEN_NAME!];
            
            if(accessToken!=undefined && accessToken!="undefined" && accessToken!=""){
              const user = decode(accessToken) as TokenUser;
              blackListAccessToken(user,accessToken);
            }  

            addAccessToken(user,res);
            
            const refreshToken = req.signedCookies[process.env.JWT_REFRESH_TOKEN_NAME!];

            if(refreshToken!=undefined  && refreshToken!="undefined" && refreshToken!=null){
              const user = decode(refreshToken) as TokenUser;
              blackListRefreshToken(user,refreshToken);
            }

            addRefreshToken(user,res);
            res.sendStatus(StatusCodes.OK);

        } catch (error) {
            console.log(error);
            next(error);
        }
    });

    authRoutes.all('/logout', checkAccessToken, async (req: express.Request, res: express.Response,next:NextFunction) => {
        const accessToken = req.signedCookies[process.env.JWT_ACCESS_TOKEN_NAME!];
        const refreshToken = req.signedCookies[process.env.JWT_REFRESH_TOKEN_NAME!];
        try {
            req.user = undefined;
            
            blackListAccessToken(req.user!,accessToken);
            res.clearCookie(process.env.JWT_ACCESS_TOKEN_NAME!);
            
            blackListRefreshToken(req.user!,refreshToken);
            res.clearCookie(process.env.JWT_REFRESH_TOKEN_NAME!);

            res.sendStatus(StatusCodes.OK);
        } catch (error) {
            console.log(error);
            next(error);
        }
    });

    authRoutes.post("/refresh", checkRefreshToken, async (req: express.Request, res: express.Response) => {
        const accessToken = req.signedCookies[process.env.JWT_ACCESS_TOKEN_NAME!];
        blackListAccessToken(req.user!,accessToken);
        addAccessToken(req.user!,res);
        const refreshToken = req.signedCookies[process.env.JWT_REFRESH_TOKEN_NAME!];
        blackListAccessToken(req.user!,refreshToken);
        addRefreshToken(req.user!,res);
        res.sendStatus(StatusCodes.OK);
    });
    return authRoutes;
}
