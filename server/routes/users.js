import express from 'express';
import { serveAvatar, updateProfile, uploadAvatar } from '../controllers/users.js';
import { authMiddleware } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatars')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

export const router = express.Router();

router.put('/profile', authMiddleware, updateProfile);
router.post(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      console.log("error");
      return res.status(400).json({ error: err.message });
    }
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    next();
  },
  uploadAvatar
);
router.get('/avatar/:filename', serveAvatar);