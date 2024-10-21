import express from "express"
import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"
import { DbUser } from "./auth/db/models"
import { hash,compare } from "bcrypt"
import { sign,verify } from "jsonwebtoken"
import cookieParser from "cookie-parser"
import { inspect } from "node:util"
import { TokenUser } from "./auth/models"

const app = express ();

//Reads request body encoded with content type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET!));

declare module "express" {
    export interface Request {
        user? : TokenUser
    }
};
const checkAuth = (req : express.Request, res : express.Response, next : express.NextFunction) => {
    const token = req.signedCookies[process.env.JWT_ACCESS_TOKEN_NAME!];
    if(!token) {
        next(StatusCodes.UNAUTHORIZED);
        return;
    }
    const user = verify(token, process.env.JWT_ACCESS_TOKEN_SECRET!);
    if(!user) {
        next(StatusCodes.UNAUTHORIZED);
        return;
    }
    req.user = user as TokenUser;

    next();
};

app.post("/signup", async (req : express.Request, res : express.Response,next: express.NextFunction) => {
    const {email, password, confirmPassword} = req.body;
    console.log("email", email, "password", password, "confirmpassword", confirmPassword);
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

app.post("/login", async (req : express.Request, res : express.Response,next: express.NextFunction) => {
    console.log(req.body);
    console.log(req.headers);
    
    const {email, password} = req.body;
    console.log("email", email, "password", password);
    try {
        const dbUser = await DbUser.findOne({email});
        console.log("dbUser", dbUser);
        
        if(!dbUser) {
            console.log("User not found");
            res.sendStatus(StatusCodes.UNAUTHORIZED);
            return;
            
        }
        console.log("compare",password, dbUser.password);
        
        if(!await compare(password, dbUser.password)) {
            console.log("Wrong password");
            res.sendStatus(StatusCodes.UNAUTHORIZED);
            return;
        }

        const user = {
            id: dbUser._id,
            email: dbUser.email
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
});

app.get("/", checkAuth, (req : express.Request, res : express.Response) => {
    console.log("user", req.user!);

    res.send("Hello World");
});

const handleErrors = (err : any, req : express.Request, res : express.Response, next : express.NextFunction) => {
    console.log(err);
    if(typeof err === "number") {
        res.sendStatus(err);
        return;
    }
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
};
app.use(handleErrors);

mongoose.connect(process.env.MONGO_URI!).then(async () => {
    console.log("Connected to MongoDB");

    app.listen(process.env.PORT, () => {
        console.log("Server started on port", process.env.PORT);
    });
});
