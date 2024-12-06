import express from 'express';
import { getAllTemplates, getTemplateById, createTemplate, removeTemplateById } from '../controllers/templates.js';

export const router = express.Router();

router.get('/', getAllTemplates);
router.get('/:id', getTemplateById);
router.post('/remove', removeTemplateById)
router.post('/', createTemplate);