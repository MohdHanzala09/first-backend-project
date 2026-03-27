import mongoose from "mongoose"

export const connectDb = async(req,res) => {
    await mongoose.connect('mongodb://127.0.0.1:27017/randomApp').then(() => {
        console.log("Database is connected");
    }).catch((error) => {
        console.log(error);
    });
}