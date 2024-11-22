const express = require('express');
const Book = require('../models/Book'); // Adjust path based on your directory structure
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - Title
 *         - Author
 *         - Genre
 *         - PublishedYear
 *         - OwnerID
 *       properties:
 *         Title:
 *           type: string
 *           description: The title of the book
 *         Author:
 *           type: string
 *           description: The author of the book
 *         Genre:
 *           type: string
 *           description: The genre of the book
 *         PublishedYear:
 *           type: integer
 *           description: The year the book was published
 *         OwnerID:
 *           type: string
 *           description: The ID of the owner of the book
 *         IsAvailable:
 *           type: boolean
 *           description: Whether the book is available for exchange
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the book was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the book was last updated
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for managing books
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

/**
 * @swagger
 * /books/available-books:
 *   get:
 *     summary: Get all available books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search query for title, author, or genre
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: List of available books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 books:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *                 totalBooks:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       404:
 *         description: No books found
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /books/owner/{id}:
 *   get:
 *     summary: Get books by owner ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Owner ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search query for title, author, or genre
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: List of books by owner
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 books:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *                 totalBooks:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       404:
 *         description: No books found
 */

/**
 * @swagger
 * /books/by-ids:
 *   post:
 *     summary: Get books by an array of IDs
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: List of books by IDs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid IDs array
 */

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book's details
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */



const authenticateToken = (req, res, next) => {
  const jwtSecret = process.env.JWT_SECRET;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, jwtSecret, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      req.user = user; // Attach the user data to the request object
      next();
  });
};



router.post('/auth', async (req, res) => {    
  const jwtSecret = process.env.JWT_SECRET;
  const jwtClientId = process.env.JWT_CLIENTID;
  const { clientId } = req.body;

  if (clientId!=jwtClientId) {
      return res.status(401).send('Invalid credentials');
  }
  //const user1 = await User.findById(decoded.id).select('-password'); 
  const token = jwt.sign({ id: clientId}, jwtSecret, { expiresIn: '1h' });
  
  res.json({ token});
});

// Create a new book
router.post('/',authenticateToken,async (req, res) => {
  try {
    const { Title, Author, Genre, PublishedYear, OwnerID } = req.body;

    const newBook = new Book({
      Title,
      Author,
      Genre,
      PublishedYear,
      OwnerID,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET route to get all books where isAvailable is true
router.get('/available-books/',authenticateToken, async (req, res) => {
  try {
    // Find all books where the logged-in user is the owner
    //const {id} = req.params; // Assume userId is available after authentication (via JWT or session)

    const { search = '', page = 1, limit  } = req.query;

    // Build the query object for search
    const query = {
      
      $and: [
        { IsAvailable: true }, // Filter by owner if provided
        {
          $or: [
            { Title: { $regex: search, $options: 'i' } }, // Case-insensitive search on title
            { Author: { $regex: search, $options: 'i' } }, // Case-insensitive search on author
            { Genre: { $regex: search, $options: 'i' } }, 
          ],
        },
      ],
    };

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Find books where the User is the owner
    const books = await Book.find(query).skip(skip).sort({ createdAt: -1 }).limit(Number(limit));
     // Get the total count of books matching the query
    const totalBooks = await Book.countDocuments(query);

    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found for this user' });
    }

    // Fetch user details
    //const user = await User.findById(id);

    // Return the user data along with the books they own
    res.status(200).json({  books,totalBooks,totalPages: Math.ceil(totalBooks / limit) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Route to get books by IDs
router.post('/by-ids',authenticateToken, async (req, res) => {
  try {
      const { ids } = req.body; // Expecting { ids: [id1, id2, ...] }
      if (!ids || !Array.isArray(ids)) {
          return res.status(400).json({ message: 'Invalid IDs array' });
      }

      const books = await Book.find({ _id: { $in: ids } }).sort({ createdAt: -1 });
      res.status(200).json(books);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});

// Get all books
router.get('/',authenticateToken, async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }); // Adjust fields as needed
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific book by ID
router.get('/:id',authenticateToken, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// Get Books By Owner
router.get('/owner/:id',authenticateToken, async (req, res) => {
  try {
    // Find all books where the logged-in user is the owner
    const {id} = req.params; // Assume userId is available after authentication (via JWT or session)

    const { search = '', page = 1, limit  } = req.query;

    // Build the query object for search
    const query = {
      $and: [
        id ? { OwnerID: id } : {}, // Filter by owner if provided
        {
          $or: [
            { Title: { $regex: search, $options: 'i' } }, // Case-insensitive search on title
            { Author: { $regex: search, $options: 'i' } }, // Case-insensitive search on author
            { Genre: { $regex: search, $options: 'i' } }, 
          ],
        },
      ],
    };

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Find books where the User is the owner
    const books = await Book.find(query).skip(skip).limit(Number(limit)).sort({ createdAt: -1 });;
     // Get the total count of books matching the query
    const totalBooks = await Book.countDocuments(query);

    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found for this user' });
    }

    // Fetch user details
    

    // Return the user data along with the books they own
    res.status(200).json({  books,totalBooks,totalPages: Math.ceil(totalBooks / limit) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a book's details
router.put('/:id',authenticateToken, async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Ensure validators run during update
    });

    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a book
router.delete('/:id',authenticateToken,async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
