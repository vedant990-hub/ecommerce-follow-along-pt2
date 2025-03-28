const User = require("../model/userModel");
const express = require("express");
const path = require("path")
const fs = require("fs");

const router = express.Router();
const {upload} = require("../middleware/multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");      
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const { type } = require("os");
const { count } = require("console");
require("dotenv").config();

// create user
router.post("/create-user", upload.single("file"), catchAsyncErrors( async (req, res, next) => {
    console.log("create user");
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
        if (req.file){
            const filePath = path.join(__dirname , "../uploads",req.file.filename) ;
            try{
                fs.unlinkSync(filePath);
            }
            catch (err){
                console.log("Error removing file:",err);
                return res.status(500).json({message:"Error removing file"});
            }
    
        }

        return next(new ErrorHandler("User already exists", 400));
    }

    let fileUrl ="";
    if (req.file){
        fileUrl = path.join("uploads", req.file.filename)   ;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("At Create", "Password:", password, "Hash:", )
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: req.file?.filename || "",
            url: fileUrl ,
        },
    });
    
console.log(user)
res.status(201).json({ success : true , user });
}));

router.post("/login-user", catchAsyncErrors(async(req, res, next) =>{
    console.log("Logging in user...");

    let{email , password} = req.body;
    email = email;
    password= password;
    if (!email || !password){
        return next(new ErrorHandler("Please enter both email and password", 400));
    }
    const user_authen = await User.findOne({ email }).select("+password");
    if (!user_authen) {
        console.log("Invalid email or password");
        return next(new ErrorHandler("No such email found. Please register first", 401));
    }
    const isPasswordMatched = await bcrypt.compare(password, user_authen.password);
    
    console.log("Passoword matched result:", isPasswordMatched );

    console.log("At Auth- password", password, "Hash:", user_authen.password );

    if (!isPasswordMatched) {
        console.log("Password mismatch");
        return next(new ErrorHandler("Authentication failed , Invalid password.", 401));
    }

    res.status(200).json({
        success : true ,
        message : "Login successfully.",
        user : {
            id : user_authen._id ,
            email : user_authen.email ,
            name : user_authen.name ,
        },
        });
}));

router.get("/Profile", catchAsyncErrors(async(req,res,next) => {
    const {email} = req.query;

    if(!email) {
        return next(new ErrorHandler("Please provide an email", 400));
    }

    const user = await User.findOne({email});
    if(!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
        success:true,
        user:{
            name: user.name,
            email: user.email,
            phone: user.phoneNumber,
            avatarUrl: user.avatar.url
        },
        addresses: user.addresses,
    });
}))

router.post("/add-address", catchAsyncErrors(async (req,res,next) => {

    console.log("Received address data:", req.body);
    const {country, city, address1, address2, zipCode, addressType, email} = req.body;

    const user = await User.findOne({email});

    if(!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const newAddress = {
        country,
        city,
        address1,
        address2,
        zipCode,
        addressType,
    };

    user.addresses.push(newAddress);
    await user.save();

    res.status(201).json({
        success: true,
        addresses: user.addresses,
    });
}))

router.get("/addresses", catchAsyncErrors(async(req, res, next) => {
    console.log("Fetching addresses for:", req.query.email);

    const {email} = req.query;
    if(!email) {
        console.log("Email not provided");
        return next(new ErrorHandler("Please provide an email", 400));
    }

    const user = await User.findOne({email});
    if(!user) {
        console.log("User not found in DB");
        return next (new ErrorHandler("User not found", 404));
    }

    console.log("User found:", user);
    res.status(200).json({
        success: true,
        addresses: user.addresses,
    });
}));


module.exports = router;