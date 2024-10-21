import express from "express"

const app = express ()

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("/", (req : express.Request, res : express.Response, next : express.NextFunction) => {
    res.write("Hello");
    next();
    res.write(" !!!"); 
    res.end();   
})

app.listen(process.env.PORT, () => {
    console.log("Server started on port ", process.env.PORT)
})

