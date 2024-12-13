import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as templatesRouter } from './routes/templates.js';
import { router as commentsRouter } from './routes/comments.js';
import { router as favoritesRouter } from './routes/favorites.js';
import { router as authRouter } from './routes/auth.js';
import { router as adminRouter } from './routes/admin.js';
import { router as usersRouter } from './routes/users.js';
import { authMiddleware } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5777;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/templates', templatesRouter);
app.use('/api/comments', authMiddleware, commentsRouter);
app.use('/api/favorites', authMiddleware, favoritesRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/users', usersRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});