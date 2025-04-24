import express from 'express';
import { getReviewsByBook, createReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
import { body } from 'express-validator';

const router = express.Router();

// GET /reviews?bookId=xxx
router.get('/', getReviewsByBook);

// POST /reviews (Protected)
router.post(
  '/',
  protect,
  [
    body('bookId').notEmpty().withMessage('Book ID is required'),
    body('text').notEmpty().withMessage('Review text is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
  ],
  createReview
);

export default router;
