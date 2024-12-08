const express = require('express');
const { register, login, getUserDetails } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', authenticate, getUserDetails);

module.exports = router;
