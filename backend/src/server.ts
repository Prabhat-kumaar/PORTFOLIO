import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import blogRoutes from './routes/blogRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import productRoutes from './routes/productRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

// Connect Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/products', productRoutes);
app.use('/api/contact', contactRoutes);

// Base Route
app.get('/', (req, res) => {
  res.json({ message: 'PRABHAT.dev Backend API is running.' });
});

// Stats API Placeholder
app.get('/api/stats', (req, res) => {
  res.json({
    github: { public_repos: 25, followers: 10 },
    leetcode: { total: 180 },
    hackerrank: 100, // manual placeholder
    gfg: 75, // manual placeholder
    totalSolved: 355
  });
});

// Error Handling Middleware for JSON Syntax Errors
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof SyntaxError && 'status' in err && err.status === 400) {
    return res.status(400).json({ error: 'Malformed JSON payload' });
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
