const User = require("../model/user");
const express = require("express");
const path = require("path")
const fs = require("fs");

const router = express.Router();
const {upload} = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
}))


module.exports = router;