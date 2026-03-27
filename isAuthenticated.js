import user from "./Models/userShema.js";

export const isAuthenticated = async (req,res,next) => {
    try {
        const info = req.cookies;
        
        // Check if token exists
        if (!info || !info.token || !info.token.email) {
            return res.status(401).json({msg:"Please login first"});
        }
        
        const email = info.token.email;
        console.log(email);
        const isAuth = await user.findOne({email});
        
        if(!isAuth) {
            return res.status(401).json({msg:"Please login first"});
        }
        
        // If it's being used as middleware, call next()
         next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Authentication error"});
    }  
}
