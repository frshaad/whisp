import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';

dotenv.config();

const app = express();

app.use(express.json()); // To parse req.body
app.use(express.urlencoded({ extended: true })); // To parse form data(urlencoded)
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

export default app;
