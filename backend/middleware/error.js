const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if (err.name === "Cost Error") {
        const message = `Resources not found with this id .. Invalid $(err.pth)`;
        err = new ErrorHandler(message, 400);
    }
    
    if (err.code === 11000){
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    if (err.code === "JsonWebTokenError") {
        const message = "Your URL is invalid, Please try again later";
        err = new ErrorHandler(message, 400);
    }

    if (err.code === "TokenExpiredError") {
        const message = "Your URL has expired, Please try again later";
        err = new ErrorHandler(message, 400);
    }

    res.status(statusCode).json({
        success: false,
        message: err.message,
    });
}