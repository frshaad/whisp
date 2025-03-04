import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import authRouter from './routes/auth.route';
import feedRouter from './routes/feed.route';
import notificationRouter from './routes/notification.route';
import postRouter from './routes/post.route';
import userRouter from './routes/user.route';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json()); // To parse req.body
app.use(express.urlencoded({ extended: true })); // To parse form data(urlencoded)
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/feed', feedRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/notifications', notificationRouter);

export default app;
