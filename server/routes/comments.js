import express from 'express';
import { getCommentsByTemplateId, addComment } from '../controllers/comments.js';

export const router = express.Router();

router.get('/:templateId', getCommentsByTemplateId);
router.post('/:templateId', addComment);