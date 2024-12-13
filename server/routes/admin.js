import express from 'express';
import { adminAuthMiddleware } from '../middleware/adminAuth.js';
import {
  loginAdmin,
  getUsers,
  deleteUser,
  getTemplates,
  updateTemplateStatus,
  deleteTemplate,
  getComments,
  deleteComment,
  getReports,
  resolveReport,
  getDashboardStats
} from '../controllers/admin.js';

export const router = express.Router();

// Auth routes
router.post('/login', loginAdmin);

// Protected routes
router.use(adminAuthMiddleware);

// Users routes
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);

// Templates routes
router.get('/templates', getTemplates);
router.put('/templates/:id/status', updateTemplateStatus);
router.delete('/templates/:id', deleteTemplate);

// Comments routes
router.get('/comments', getComments);
router.delete('/comments/:id', deleteComment);

// Reports routes
router.get('/reports', getReports);
router.put('/reports/:id/resolve', resolveReport);

// Dashboard stats
router.get('/stats', getDashboardStats);