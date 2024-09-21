import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const register=async(req,res)=>{
    try{
        const{fullname,email,phoneNumber,password,role}=req.body;
        console.log(`New user  ${email}`);
        if(!fullname ||!email || !phoneNumber ||!role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });

        };
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        //ensure unique email address
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:'User already exist with email.',
                success:false,
            })
        }
        const hashedPassword=await bcrypt.hash(password, 10);
        
        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    }
    catch(error){
        console.log(error);
    }
}



export const login =async(req,res)=>{
    try{
        const{email,password,role}=req.body;
        console.log(`Existing user  ${email}`);
        if(!email || !password ||!role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });

        };
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Incorrect email or password.",
                success:false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        //check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData={
            userId:user._id
        }
        
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const logout=async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out succesfully.",
            success:true
        })
    }
    catch(error){
      console.log(error);
    }
}

export const updateProfile=async(req,res)=>{
    try{
       const{fullname,email,phoneNumber,bio,skills}=req.body;
       console.log(fullname,email,phoneNumber,bio,skills);
       
       const file=req.file;
    //    console.log(file);
       const fileUri=getDataUri(file);
    //    console.log(fileUri);
    //    const cloudResponse=await cloudinary.uploader.upload(fileUri.content);
    //    console.log("Cloudinary Response:", cloudResponse);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, { resource_type: 'auto' });
console.log("Cloudinary Response:", cloudResponse);

 
   let skillsArray;
    if(skills){
        skillsArray=skills.split(",");
    }
    
    const userId=req.id;//middleware authentication
    let user=await User.findById(userId);
    if(!user){
        return res.status(400).json({
            message:"user not found.",
            success:false
        })
    }
    //updating data
    if(fullname) user.fullname=fullname
    if(email) user.email=email
    if(phoneNumber)user.phoneNumber=phoneNumber
    if(bio)user.profile.bio=bio
    if(skills)user.profile.skills=skillsArray

    // console.log("Updated User Details:", user);
    //resume will come later here.....
    if(cloudResponse){
        user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname//save the original name
    }
    await user.save();
    user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile
    }
    return res.status(200).json({
        message:"Profile updated succesfully.",
        user,
        success:true
    })

    }
    catch(error){
      console.log(error);
    }
}

    
