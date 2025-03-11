// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware')
const { addReview, getReviewsForBook } = require('../controllers/reviewController');

router.post('/', authenticateUser, addReview);
router.get('/:bookId', getReviewsForBook);

module.exports = router;
