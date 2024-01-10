const express = require('express');
const router = express.Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// Use imported routes for /thoughts and /users
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;