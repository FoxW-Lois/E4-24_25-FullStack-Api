import express from "express"
import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"
import { User } from "./auth/models";
import { hash,compare } from "bcrypt"

const app = express ()

//Reads request body encoded with content type
app.use(express.urlencoded({ extended: true }));

const checkAuth = (req : express.Request, res : express.Response, next : express.NextFunction) => {
    //TODO: check auth
    next();
    // next(StatusCodes.UNAUTHORIZED)
}

app.get("/", checkAuth, (req : express.Request, res : express.Response) => {
    res.send("Hello World");
})

app.post("/signup", async (req : express.Request, res : express.Response,next: express.NextFunction) => {
    const {email, password, confirmPassword} = req.body
    console.log("email", email, "password", password, "confirmpassword", confirmPassword);
    if(!email || !password || (password !== confirmPassword)) {
        next(StatusCodes.BAD_REQUEST)
        return
    }
    
    try {
        const newUser = new User({
            email,
            password : await hash(password, 12)
        })
        await newUser.save()
        next(StatusCodes.CREATED)
    } catch (error) {
        next(error)
    }
})

app.post("/login", async (req : express.Request, res : express.Response,next: express.NextFunction) => {
    console.log(req.body);
    
    const {email, password} = req.body
    console.log("email", email, "password", password);
    try {
        const dbUser = await User.findOne({email})
        console.log("dbUser", dbUser);
        
        if(!dbUser) {
            console.log("User not found");
            res.sendStatus(StatusCodes.UNAUTHORIZED)
            return
            
        }
        console.log("compare",password, dbUser.password);
        
        if(!await compare(password, dbUser.password)) {
            console.log("Wrong password");
            res.sendStatus(StatusCodes.UNAUTHORIZED)
            return
        }
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        next(error)
    }
})

const handleErrors = (err : any, req : express.Request, res : express.Response, next : express.NextFunction) => {
    console.log(err);
    if(typeof err === "number") {
        res.sendStatus(err);
        return;
    }
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
}
app.use(handleErrors)

mongoose.connect(process.env.MONGO_URI!).then(async () => {
    console.log("Connected to MongoDB")
    const lois = await User.findOne({email: "loispujolt@gmail.com"})
    if(!lois) {
        const user = new User({
            email: "loispujolt@gmail.com",
            password: "123456"
        })
        await user.save()
    }
    else{
        console.log("User already exists", lois)
    }

    app.listen(process.env.PORT, () => {
        console.log("Server started on port", process.env.PORT)
    })
})
