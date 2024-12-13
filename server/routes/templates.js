import express from 'express';
import { getAllTemplates, getTemplateById, createTemplate } from '../controllers/templates.js';

export const router = express.Router();

router.get('/', getAllTemplates);
router.get('/:id', getTemplateById);
router.post('/', createTemplate);