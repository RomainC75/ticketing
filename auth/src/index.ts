import mongoose from "mongoose"
import { app } from "./app"

const start = async() =>{
    if(!process.env.JWT_KEY){
        throw Error("JWT_KEY must be defined")
    }
    if(!process.env.MONGO_URI){
        throw Error("MONGO_URI must be defined")
    }
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connected to mongoose')
    } catch (error) {
        console.error(error)   
    }
}

app.listen(3000, ()=>{
    console.log("Listening on port 3000!!!!");
    start()
});

