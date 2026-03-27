import user from "../Models/userShema.js";
import bcrypt from 'bcrypt';
import post from '../Models/postSchema.js'
import { isAuthenticated } from "../isAuthenticated.js";
import { connectDb } from "../connectDb.js";
connectDb();

export const handleCreate = async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        console.log(name, email, password, age);
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "All feilds are empty", success: false });
        }
        // use findOne to get a single document (or null) instead of an array
        const existingUser = await user.findOne({ email });
        console.log('existingUser ->', existingUser);
        if (existingUser) {
            return res.status(400).json({ msg: "User already exist", success: false });
        }
        // hash password with promise/async version so we can await result
        const encryptPass = await bcrypt.hash(password, 8);
        const createUser = await user.create({
            name,
            email,
            password: encryptPass,
            age
        })
        

        const token = {
            email: createUser.email,
            id: createUser._id,
        }

        if (createUser) {
            return res.cookie("token", token).status(200).json({ msg: "User created successfully", success: true });
        }
    } catch (error) {
        console.log(error);
    }
}


export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            return res.status(400).json({ msg: "All feilds are empty", success: false });
        }
        // use findOne to get a single document (or null) instead of an array
        const existingUser = await user.findOne({ email });
        console.log('existingUser ->', existingUser);
        if (!existingUser) {
            return res.status(400).json({ msg: "User not exist create one", success: false });
        }
        const isPasswordSame = await bcrypt.compare(password, existingUser.password);
        if (isPasswordSame) {
            const token = {
                email: existingUser.email,
                id: existingUser._id,
            }
            return res.cookie("token", token).status(200).json({ msg: "User login successfully", success: true });
        }
        if (!isPasswordSame) {
            return res.status(401).json({ msg: "Incorrect password", success: false });
        }
    } catch (error) {
        console.log(error);
    }
}


export const handleCreatePost = async (req, res) => {
    try {
        // Check authentication first
        const info = req.cookies;
        if (!info || !info.token || !info.token.email || !info.token.id) {
            return res.status(401).json({msg:"Please login first", success: false});
        }
        
        // Verify user exists
        const isAuth = await user.findOne({email: info.token.email});
        if (!isAuth) {
            return res.status(401).json({msg:"Please login first", success: false});
        }
        
        const { title, description } = req.body;
        console.log(title, description);
        
        if (!title || !description) {
            return res.status(400).json({ msg: "Title and description required", success: false });
        }
        
        const id = info.token.id;
        const createPost = await post.create({
            id,
            title,
            description
        })
        if (!createPost) {
            return res.status(409).json({ msg: "Post failed plz try again", success: false });
        }
        return res.status(200).json({ msg: "Post created successfully", success: true })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: "Server error", success: false });
    }

}