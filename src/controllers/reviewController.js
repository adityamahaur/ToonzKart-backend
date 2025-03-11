// controllers/reviewController.js
const Review = require('../models/reviewModel');

exports.addReview = async (req, res) => {
  try {
    const { book, rating, comment } = req.body;
    const userId = req.user._id; // Extract logged-in user from JWT token

    // Validate request
    if (!book) {
      return res.status(400).json({ message: "Book ID is required" });
    }
    if (!rating) {
      return res.status(400).json({ message: "Rating is required" });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // Create new review
    const review = new Review({
      user: userId,  // Assign user automatically
      book,
      rating,
      comment
    });

    await review.save();
    res.status(201).json({ message: "Review added successfully", review });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


exports.getReviewsForBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({ bookId }).populate('userId', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
