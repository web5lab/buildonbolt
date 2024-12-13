import express from 'express';
import { getFavorites, toggleFavorite } from '../controllers/favorites.js';

export const router = express.Router();

router.get('/', getFavorites);
router.post('/:templateId/toggle', toggleFavorite);