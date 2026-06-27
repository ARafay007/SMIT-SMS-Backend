
import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit'
import { connectDB } from './connectDB.js';
import { studentRoutes } from './routes/student.js';
import { teacherRoutes } from './routes/teacher.js';
import 'dotenv/config'

await connectDB();

const app = express();

app.use(cors());

const limiter = rateLimit({
  windowMs: 0.1 * 60 * 1000, // 10 milliseconds time window
  limit: 2, // Max 100 requests per IP per window
  message: 'Too many requests from this IP, please try again later.',
  statusCode: 429, // Explicitly return 429 Too Many Requests
  standardHeaders: 'draft-8', // Return standard IETF rate-limit headers
  legacyHeaders: false, // Turn off X-RateLimit-* headers
});

app.use(limiter);

app.use(express.json());

app.use('/student', studentRoutes);

app.use('/teacher', teacherRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is listening at http://localhost:${PORT}`);
});