import cookieParser from "cookie-parser";
import express from "express";
import { StatusCodes } from "http-status-codes";
import { checkAuth } from "./auth/midlewares";
import { createAuthRoutes } from "./auth/router";

export const createApp = () => {
    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.COOKIE_SECRET!));

    app.use(createAuthRoutes());

    app.get("/", checkAuth, (req: express.Request, res: express.Response) => {
        console.log("user", req.user!);
        res.send("Hello World!");
    });

    const handleErrors = (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        console.log(err);
        if (typeof err === "number") {
            res.sendStatus(err);
            return;
        }
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    };

    app.use(handleErrors);

    return app;
};
