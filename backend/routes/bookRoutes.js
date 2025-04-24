import express from 'express';
import { getAllBooks, getBookById, createBook } from '../controllers/bookController.js';
import { body } from 'express-validator';
import { protect } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllBooks);
router.get('/:id', getBookById);

// Admin-only route
router.post(
  '/',
  protect,
  isAdmin,
  [
    body('title').not().isEmpty(),
    body('author').not().isEmpty(),
    body('coverImage').not().isEmpty()
  ],
  createBook
);

export default router;
