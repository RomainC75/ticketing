import express from "express";
import { json } from 'body-parser';
import mongoose from "mongoose";
import { currentUserRouter } from "./routes/current-user";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { errorHandler } from "./middlewares/error-handler.mid";
import { NotFoundError } from "./errors/not-found-error";
import cookieSession from "cookie-session";

const app = express();
// because of ingress-nginx

app.set('trust proxy', 1);
app.use(json());

app.use(cookieSession({
    signed: false,
    secure: true
}))

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*',async(req,res,next)=>{
    next(new NotFoundError())
})
app.use(errorHandler);

const start = async() =>{
    if(!process.env.JWT_KEY){
        throw Error("JWT_KEY must be defined")
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log('connected to mongoose')
    } catch (error) {
        console.error(error)   
    }
}

app.listen(3000, ()=>{
    console.log("Listening on port 3000!!!!");
    start()
});

