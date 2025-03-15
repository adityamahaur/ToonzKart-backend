# User Routes:
// User Registration
router.post("/register", registerUser);

// User Login
router.post("/login", loginUser);

// Wishlist operations
router.use(authenticateUser);

router.get('/wishlist', getWishlist);
router.post('/wishlist', addToWishlist);
router.delete('/wishlist/:bookId', removeFromWishlist);
router.delete("/", authenticateUser, clearWishlist);     // Clear wishlist

# Store Routes
// Store Registration
router.post("/register", registerStore);

// Store Login
router.post("/login", loginStore);

# Review Routes
router.post('/', authenticateUser, addReview);
router.get('/:bookId', getReviewsForBook);

# Order Routes
// Place new order
router.post('/', createOrder);

// Get all orders for user
router.get('/', getUserOrders);

// Get single order detail
router.get('/:orderId', getOrderById);

# Cart Routes
router.get('/', getCart);
router.post('/', addToCart);
router.put('/:itemId', updateCartItem);
router.delete('/:itemId', removeFromCart);
router.delete('/', clearCart);

# Book Routes
// Protected (Admin) - Add a new book
router.post("/", authenticateAdmin, addBook);

// Shop by School
router.get('/school/:schoolName', getBooksBySchool);

// Shop by Subject
router.get('/subject/:subjectName', getBooksBySubject);

// Single book details (optional)
router.get('/:id', getBookById);

// General books listing or search (e.g., for "Shop on Demand" or general searches)
router.get('/', getAllBooks);

# AdminUser Routes
// 🔹 Add a new user (Admin Only)
router.post("/", authenticateAdmin, addUser);

// 🔹 Fetch all users (Admin Only)
router.get("/", authenticateAdmin, getAllUsers);

// 🔹 Fetch a single user by ID (Admin Only)
router.get("/:id", authenticateAdmin, getUserById);

// 🔹 Update user details (Admin Only)
router.put("/:id", authenticateAdmin, updateUser);

// 🔹 Delete a User (Admin Only)
router.delete("/:id", authenticateAdmin, deleteUser);

# Admin Routes
// Admin Registration
router.post("/register", registerAdmin);

// Admin Login
router.post("/login", loginAdmin);

# AdminOrder Routes
// 🔹 Export Orders as CSV (Admin Only)
router.get("/export-csv", authenticateAdmin, exportOrdersCSV);

// 🔹 Get all orders (Admin Only)
router.get("/", authenticateAdmin, getAllOrders);

// 🔹 Update order status (Admin Only)
router.put("/:id", authenticateAdmin, updateOrder);

// 🔹 Get a single order by ID (Admin Only)
router.get("/:id", authenticateAdmin, getOrderById);

# AdminBook Routes
// 🔹 Add a New Book (Admin Only)
router.post("/", authenticateAdmin, upload.single("image"), addBook);

// 🔹 Fetch all books (Admin Only)
router.get("/", authenticateAdmin, getAllBooks);

// 🔹 Fetch a single book by ID (Admin Only)
router.get("/:id", authenticateAdmin, getBookById);

// 🔹 Update book details (Admin Only)
router.put("/:id", authenticateAdmin, upload.single("image"), updateBook);

// 🔹 Delete a Book (Admin Only)
router.delete("/:id", authenticateAdmin, deleteBook);




