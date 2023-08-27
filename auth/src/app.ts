import express from "express";
import { json } from 'body-parser';
import { currentUserRouter } from "./routes/current-user";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { errorHandler, NotFoundError } from "@mychnrdorg/common";
import cookieSession from "cookie-session";

const app = express();
// because of ingress-nginx

app.set('trust proxy', true);
app.use(json());

app.use(
    cookieSession({
      signed: false,
      secure: process.env.NODE_ENV !== 'test'
    })
  );

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*',async(req,res,next)=>{
    next(new NotFoundError())
})
app.use(errorHandler);


export {
    app
}

// app and index are split for the tests