// const express=require('express') old way
import express from "express";
import cookieParser from "cookie-parser";
//keep track of who logged in
import cors from 'cors';
//If your website is example.com and you want it to get data from api.example.com, you use CORS to tell api.example.com that requests from example.com are okay
import dotenv from 'dotenv';
import userRoute from "./routes/user.route.js";
import connectDB from "./utils/db.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";


dotenv.config({});

const app=express();

//api
app.get("/home",(req,res)=>{
    return res.status(200).json({
        message:'I am comming from backend',
        success:true
    })
})

//middleware
app.use(express.json());
//when we will send request our data will pass in json format
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions={
    origin:'http://localhost:5173',
    //react vite local host 5173
    credentials:true
}

app.use(cors(corsOptions));



const PORT = process.env.PORT||3000;

//api's
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);


app.listen(PORT,()=>{
    connectDB();
    console.log(`server running at port ${PORT}`);
})