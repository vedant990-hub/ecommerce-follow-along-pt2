const ErrorHandler = require("../utils/ErrorHandler");

module.exports =(err,rew,res,next)=>{
    err.statusCode=err.statusCode ||500;
    err.message=err.message || "Internal Server Error";
    if(err.name =="Cast Error"){
        const message =`Resources not found with this id.. Invalid ${err.path}`;
        err=new ErrorHandler(message,404);  
    }
    if (err.code===11000){
        const message =`Duplicate key ${object.keys(err.keyValue)} Entered`;
        err=new ErrorHandler(message,404);  
    }
    if (err.code=="JsonWebTokenError"){
        const message =`Your URL is invalid please try again later`;
        err=new ErrorHandler(message,404);  
    }
    if (err.code=="TokenExpiredErrror"){
        const message =`Your URL is expired please try again later`;
        err=new ErrorHandler(message,404);  
    }
    res.status(statusCode).json({
        success:false,
        message:err.message,
    });
};