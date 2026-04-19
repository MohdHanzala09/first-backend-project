import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[4,'username should atlest 4 char'],
        maxLength:[20,'username should less than 20 char']
    },
    password:{
        type:String,
        required:true,
        minLength: [8,'password should atleast 8'],
        maxLength: [20,'password less than 20']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength: 10
    },
    age:{
        type:Number,
        min:[4,'age should atlest 4 years'],
        max:[99,'age should less than 99 years']
    },
    createdAt: {
        type:Date,
        default:Date.now
    }
})

const user = mongoose.model('user' , userSchema);

export default user;