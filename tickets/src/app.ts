import express from "express";
import { json } from 'body-parser';
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

// ...

app.all('*',async(req,res,next)=>{
    next(new NotFoundError())
})
app.use(errorHandler);


export {
    app
}

// app and index are split for the tests