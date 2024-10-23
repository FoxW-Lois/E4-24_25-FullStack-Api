import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';
import { DbUser } from './db/models';
import { TokenUser } from './models';
import { addAccessToken, addRefreshToken, createTokenUser } from './util';
import createHttpError from "http-errors";

export const checkAccessToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.signedCookies[process.env.JWT_ACCESS_TOKEN_NAME!];

    if (!token) {
        next(createHttpError(StatusCodes.UNAUTHORIZED));
        return;
    }

    try {
        const user = verify(token, process.env.JWT_ACCESS_TOKEN_SECRET!) as TokenUser;
        const dbUser = await DbUser.findOne({ email: user.email });

        if (!dbUser) {
            next(createHttpError(StatusCodes.UNAUTHORIZED));
            return;
        }
        if (dbUser.expiredAccessTokens.includes(token)) {
            next(createHttpError(StatusCodes.UNAUTHORIZED));
            return;
        }

        req.user = await createTokenUser(user, req);
        addAccessToken(req.user, res);
        addRefreshToken(req.user, res);
        next();

    } catch (error) {
        console.log(error);
        next(createHttpError(StatusCodes.UNAUTHORIZED));
    }
};

export const checkRefreshToken = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const token = req.signedCookies[process.env.JWT_REFRESH_TOKEN_NAME!];

    if (!token) {
        next(createHttpError(StatusCodes.UNAUTHORIZED));
        return;
    }

    try {
        const user = verify(token, process.env.JWT_REFRESH_TOKEN_SECRET!) as TokenUser;
        const dbUser = await DbUser.findOne({ email: user.email });
        
        if (!dbUser) {
            next(createHttpError(StatusCodes.UNAUTHORIZED));
            return;
        }
        if (dbUser.expiredRefreshTokens.includes(token)) {
            next(createHttpError(StatusCodes.UNAUTHORIZED));
            return;
        }

        req.user = await createTokenUser(user, req);
        addAccessToken(req.user, res);
        addRefreshToken(req.user, res);
        next();

    } catch (error) {
        console.log(error);
        next(error);
    }
};