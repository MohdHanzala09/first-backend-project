import mongoose, { Mongoose, Schema } from 'mongoose';


const postSchema = mongoose.Schema({
    id:{
        type:Schema.Types.ObjectId,
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdAt: {
        type:Date,
        default:Date.now
    }
})


const post = mongoose.model('post' , postSchema);

export default post;
