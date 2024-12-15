import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { router as templatesRouter } from './routes/templates.js';
import { router as commentsRouter } from './routes/comments.js';
import { router as favoritesRouter } from './routes/favorites.js';
import { router as authRouter } from './routes/auth.js';
import { router as adminRouter } from './routes/admin.js';
import { router as usersRouter } from './routes/users.js';
import { authMiddleware } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(bodyParser.json({ limit: '20mb' })); // Adjust the size limit as needed
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
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