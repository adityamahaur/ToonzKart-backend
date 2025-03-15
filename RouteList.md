# Completed Routes

## User Routes
- **`POST /register`** - Register a new user
- **`POST /login`** - User login
- **`POST /forgot-password`** - Send password reset link via email
- **`POST /reset-password`** - Reset password with token
- **`GET /profile`** - View user profile details
- **`PUT /profile`** - Update user profile details
- **`POST /logout`** - Log the user out securely
- **`GET /notifications`** - Fetch notifications for the user
- **`GET /wishlist`** - Get user wishlist
- **`POST /wishlist`** - Add book to wishlist
- **`DELETE /wishlist/:bookId`** - Remove book from wishlist
- **`DELETE /wishlist`** - Clear wishlist

## Store Routes
- **`POST /register`** - Register a new store
- **`POST /login`** - Store login

## Review Routes
- **`POST /:bookId`** - Add a review for a book
- **`GET /:bookId`** - Get all reviews for a book

## Order Routes
- **`POST /create`** - Create a new order
- **`GET /:orderId`** - Get order details
- **`GET /user/:userId`** - List all orders for a specific user
- **`PUT /update/:orderId`** - Update order details
- **`DELETE /delete/:orderId`** - Cancel an order

## Cart Routes
- **`GET /`** - View the user's cart
- **`POST /`** - Add book to cart
- **`PUT /:itemId`** - Update cart item quantity
- **`DELETE /:itemId`** - Remove item from cart
- **`DELETE /`** - Clear entire cart

## Book Routes
- **`GET /`** - Get all books
- **`GET /:bookId`** - Get details of a specific book

## Admin Routes
- **`POST /register`** - Register a new admin
- **`POST /login`** - Admin login

# Routes to be Created

## User Routes
- **`PUT /update-password`** - Change password for authenticated users
- **`POST /contact-support`** - Submit support inquiries

## Store Routes
- **`GET /:storeId/inventory`** - View available inventory in a specific store
- **`GET /featured-stores`** - List top-performing or popular stores
- **`POST /store/:storeId/promotions`** - Add promotional offers for stores
- **`GET /nearby-stores`** - Show stores based on user’s location

## Review Routes
- **`POST /report/:reviewId`** - Report inappropriate or fake reviews
- **`GET /top-reviews/:bookId`** - Display highlighted reviews
- **`POST /like/:reviewId`** - Like a review
- **`POST /dislike/:reviewId`** - Dislike a review

## Order Routes
- **`POST /cancel/:orderId`** - Cancel an order before dispatch
- **`POST /return/:orderId`** - Initiate a return/refund request
- **`POST /reorder/:orderId`** - Reorder previous purchases
- **`POST /apply-coupon`** - Apply a discount coupon at checkout
- **`POST /calculate-shipping`** - Calculate delivery charges dynamically

## Cart Routes
- **`POST /save-for-later/:itemId`** - Move items to "Save for Later"
- **`GET /saved-items`** - View saved-for-later items
- **`POST /move-to-cart/:itemId`** - Move saved items back to the cart
- **`POST /apply-discount`** - Add discounts directly in the cart

## Book Routes
- **`POST /add`** - Add a new book (Admin only)
- **`PUT /update/:bookId`** - Update book details (Admin only)
- **`DELETE /delete/:bookId`** - Delete a book (Admin only)
- **`GET /trending`** - List trending books
- **`GET /recommended`** - AI/ML-based book recommendations
- **`GET /bestsellers`** - List bestsellers in different genres
- **`POST /request-book`** - Let users request a new book to be added
- **`GET /similar-books/:bookId`** - Show books similar to the selected one

