import express from 'express';
import { sendOTP, verifyOTP, login, register } from '../controllers/auth.js';

export const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);