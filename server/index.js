import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as templatesRouter } from './routes/templates.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin:'*'
}));
app.use(express.json());

// Routes
app.use('/api/templates', templatesRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});