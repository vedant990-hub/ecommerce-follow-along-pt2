const express = require('express');
const router = express.Router();
const User = require('../model/user');
const ErrorHandler = require('../utils/ErrorHandler');
const { upload } = require('../multer');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create user
router.post('/create-user', upload.single('file'), catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return next(new ErrorHandler("User already exists", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        avatar: {
            public_id: req.file?.filename || "",
            url: req.file ? `/uploads/${req.file.filename}` : "",
        }
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY || 'fallback_secret', {
        expiresIn: '7d',
    });

    res.status(201).json({
        success: true,
        token,
        user
    });
}));

// Login user
router.post('/login-user', catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select('+password');
    console.log(user)
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    console.log(password)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid)
    if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY || 'fallback_secret', {
        expiresIn: '7d',
    });

    res.status(200).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar
        }
    });
}));

// Get user profile
router.get('/profile', catchAsyncErrors(async (req, res, next) => {
    const { email } = req.query;
    if (!email) {
        return next(new ErrorHandler("Please provide an email", 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
        success: true,
        user: {
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            avatar: user.avatar
        },
        addresses: user.addresses
    });
}));

// Add address
router.post('/add-address', catchAsyncErrors(async (req, res, next) => {
    const { email, country, city, address1, address2, zipcode, addresstype } = req.body;

    if (!email) {
        return next(new ErrorHandler("Please provide an email", 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    user.addresses.push({
        country,
        city,
        address1,
        address2,
        zipCode: zipcode,
        addressType: addresstype
    });

    await user.save();

    res.status(201).json({
        success: true,
        message: "Address added successfully",
        addresses: user.addresses
    });
}));

module.exports = router;