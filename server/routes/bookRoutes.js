const express = require('express');
const { getBooks, addBook } = require('../controllers/bookController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/books', authenticate, getBooks);
router.post('/books', authenticate, addBook);

module.exports = router;
