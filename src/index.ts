import express from "express"
import { StatusCodes } from "http-status-codes"

const app = express ()

const checkAuth = (req : express.Request, res : express.Response, next : express.NextFunction) => {
    //TODO: check auth
    //next();
    next(StatusCodes.UNAUTHORIZED)
}

app.get("/", checkAuth, (req : express.Request, res : express.Response) => {
    res.send("Hello World");
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

app.listen(process.env.PORT, () => {
    console.log("Server started on port", process.env.PORT)
})