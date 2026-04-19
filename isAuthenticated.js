import user from "./Models/userShema.js";
import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req,res,next) => {
    try {
        const info = req.cookies;
        // console.log(info);
        // Check if token exists
        if (!info) {
            return res.status(401).json({msg:"Please login first I"});
        }
        
        const userInfo = jwt.verify(info.token,process.env.JWT_SECRET_KEY);
        const email = userInfo.email;
        
        const isAuth = await user.findOne({email});
        
        if(!isAuth) {
            return res.status(401).json({msg:"Please login first II"});
        }
        
        // If it's being used as middleware, call next()
         next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Authentication error"});
    }  
}
