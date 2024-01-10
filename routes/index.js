const express = require('express');
const router = express.Router();

// Import API routes from the API index file
const apiRoutes = require('./api');

// Use imported routes when URL has /api
router.use('/api', apiRoutes);

// Middleware to catch any requests not handled by the above routes
router.use((req, res) => res.status(404).send('Route not found.'));

module.exports = router;