import express from "express";
import appRoute from './Routes/routers.js'
import { connectDb } from "./connectDb.js";
import cookieParser from "cookie-parser";
import userRoute from "./Routes/userRoute.js";


const app = express();
const PORT = 3000;


app.use(cookieParser());
app.use(express.json());
app.use(appRoute);
app.use(userRoute);


app.listen(PORT, () => console.log(`Server is running at port : ${PORT}`))
