import dotenv from 'dotenv'

import connectDB from './db/index.js'
import express from 'express'

const app = express()
// 2nd approach
dotenv.config();

connectDB();
app.listen(process.env.PORT, ()=>{
    console.log(`app listening at port ${process.env.PORT}`)
})
/*
1st approach
 # amatuare
(async()=>{
    try{
        // connecting mongoose
        await mongoose.connect($`{process.env.MONGODB_URL}/{DB_NAME}`)
        app.on("error",(error)=>{
            console.log(error);
            throw error
        })
        app.listen(process.env.PORT, ()=>{
            console.log(`app is listening on ${process.env.PORT}`);
        })
    }
    catch(error){
        console.log("error:"+error)
        throw error
    }
})()
*/