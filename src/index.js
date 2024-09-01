import dotenv from 'dotenv'

import connectDB from './db/index.js'
import express from 'express'

const app = express()
// 2nd approach
dotenv.config();

connectDB()
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`port is running at ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("failed to connect mongo , error :"+err);
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