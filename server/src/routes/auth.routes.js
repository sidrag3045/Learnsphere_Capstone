const express = require('express');
const router = express.Router();


// Health check route (Base route)
router.get('/', (req, res) => {
    res.status(200).json({
        message: '✅ LearnSphere auth route is working!'
    });
});

// Register Endpoint
router.get('/register', (req, res) => {
    res.status(200).json({
        message: 'Register endpoint is working!'
    });
});

// Login Endpoint
router.get('/login', (req, res) => {
    res.status(200).json({
        message: 'Login endpoint is working!'
    });
});

module.exports = router;