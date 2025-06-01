const express = require('express');
const router = express.Router();


// Health check route (Base route)
router.get('/', (req, res) => {
    res.status(200).json({
        message: '✅ LearnSphere auth route is working!'
    });
});

// Register Endpoint
router.post('/register', register);

// Login Endpoint
router.post('/login', login);

// Logout Endpoint
router.post('/logout', logout);

module.exports = router;