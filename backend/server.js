import cookieParser from "cookie-parser";
import cors from "cors";
import 'dotenv/config';
import express from "express";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";        
import userRouter from "./routes/userRoutes.js";

const app = express();

const port = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}))


// api endpoints
app.get('/',(req, res)=> res.send("Api Working"));
app.use('/api/auth', authRouter)
//' api/user/data will give the data of user
app.use('/api/user', userRouter)

app.listen(port, () => console.log(`Server Started on POrt: ${port}`))