import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from 'cors';
import appRoute from './Routes/routers.js'
import { connectDb } from "./connectDb.js";
import cookieParser from "cookie-parser";
import userRoute from "./Routes/userRoute.js";
import { authLimiter, generalLimiter } from "./rateLimit.js";


dotenv.config();
const app = express();
app.use(helmet());

// const corsOption = {
//     origin: process.env.FRONTEND_URI ,
//     methods:["PUT","POST","DELETE","GET"],
//     credentials:true
// }

app.use(generalLimiter);
app.use(express.json());
app.use(cookieParser());
connectDb();
// app.use(cors(corsOption));
app.use(appRoute);
app.use("/api/user",userRoute);
// app.use("/api/user/login",authLimiter);
// app.use("/api/user/register",authLimiter);


app.listen(process.env.PORT, () => console.log(`Server is running at port : ${process.env.PORT}`))
