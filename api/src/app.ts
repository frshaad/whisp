import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.router';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRouter);

export default app;
