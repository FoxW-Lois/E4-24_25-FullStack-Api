import cookieParser from 'cookie-parser';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { checkAccessToken } from './auth/midlewares';
import { createAuthRoutes } from './auth/router';
import {HttpError} from "http-errors";

export const createApp = () => {
    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.COOKIE_SECRET!));

    app.use(createAuthRoutes());

    app.get('/', checkAccessToken, (req: express.Request, res: express.Response) => {
        res.send('Hello World!');
    });

    const handleErrors = (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        console.log(err);
        if (err instanceof HttpError) {
            res.status(err.status);
            res.send(err.message);
            return;
        }
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }

    app.use(handleErrors);

    return app;
}
