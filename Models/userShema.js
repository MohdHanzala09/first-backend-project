import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number
    },
    createdAt: {
        type:Date,
        default:Date.now
    }
})

const user = mongoose.model('user' , userSchema);

export default user;