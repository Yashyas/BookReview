import Review from "../models/Review.js";
import { validationResult } from "express-validator";

export const getReviewsByBook = async (req, res) => {
  const { bookId } = req.query;

  if (!bookId)
    return res.status(400).json({ msg: "bookId query param is required" });

  try {
    const reviews = await Review.find({ bookId }).populate("userId", "name");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch reviews" });
  }
};

export const createReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { bookId, text, rating, refinedText } = req.body;

  try {
    // prevent duplicate review per user per book
    const alreadyReviewed = await Review.findOne({ bookId, userId: req.user });
    if (alreadyReviewed)
      return res.status(400).json({ msg: "You already reviewed this book." });

    const review = new Review({
      userId: req.user,
      bookId,
      text,
      refinedText,
      rating,
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ msg: "Failed to submit review" });
  }
};
