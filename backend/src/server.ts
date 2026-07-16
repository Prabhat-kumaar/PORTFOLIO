import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
