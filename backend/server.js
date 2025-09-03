import express from 'express';
import dotenv from 'dotenv';
import { dbConfig } from './db/config.js';
import { userRouter } from './router/user.router.js';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

dotenv.config({ encoding: 'utf8' });
dbConfig();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
});


app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});
