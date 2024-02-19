import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { userRouter } from './routers/index.js';
import { connectDB, redisConfig } from './loader/index.js';
import { privateKey } from './config/privateKey.js';
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import './loader/index.js';
// Now you can access the rooms object in this file
var app = express();
app.use(session(redisConfig));
app.use(express.json());
// enable cors
app.use(cors());
app.options('*', cors());
app.use(cookieParser());
app.use('/v1', userRouter);
connectDB()

app.listen(privateKey.PORT, () => {
    console.log(`App is running on port: ${privateKey.PORT}`);
});

export default app;
