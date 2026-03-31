import { Router } from 'express';
import {
  register,
  login,
  getCurrentUser,
  updateProfile,
} from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getCurrentUser);
router.put('/profile', protect, updateProfile);

export default router;
