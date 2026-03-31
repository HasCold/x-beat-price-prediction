import { Router } from 'express';
import {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
  getAllOrders,
} from '../controllers/orderController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

// User routes
router.post('/', protect, createOrder);
router.get('/', protect, getUserOrders);
router.get('/:id', protect, getOrder);

// Admin routes
router.put('/:id/status', protect, authorize('admin'), updateOrderStatus);
router.get('/admin/all', protect, authorize('admin'), getAllOrders);

export default router;
