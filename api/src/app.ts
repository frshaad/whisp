import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.router';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json()); // To parse req.body
app.use(express.urlencoded({ extended: true })); // To parse form data(urlencoded)
app.use(cookieParser());

app.use('/api/auth', authRouter);

export default app;
