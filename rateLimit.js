import rateLimit from "express-rate-limit";

export const generalLimiter = rateLimit({
    windowMs: 10*60*1000, //10 minutes
    max:50, // only 50 request per 10 min
    message:{
        success:false,
        message:"too many frequent requests"
    }
})
export const authLimiter = rateLimit({
    windowMs: 10*60*1000, //10 minutes
    max:15, // only 50 request per 10 min
    message:{
        success:false,
        message:"too many frequent requests"
    }
})