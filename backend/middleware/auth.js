const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return next(new ErrorHandler("Please login to access this resource", 401));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || 'fallback_secret');
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorHandler("Authentication failed", 401));
    }
};

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403));
        }
        next();
    };
};