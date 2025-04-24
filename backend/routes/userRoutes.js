import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { body } from 'express-validator';

const router = express.Router();

// GET user profile (public)
router.get('/:id', getUserProfile);

// PUT update profile (protected)
router.put(
  '/:id',
  protect,
  [
    body('name').optional().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('bio').optional().isLength({ max: 300 }).withMessage('Bio too long')
  ],
  updateUserProfile
);

export default router;
