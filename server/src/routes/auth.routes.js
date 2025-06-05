const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { validateRequest } = require('../middlewares/validateRequest');
const { registerUserSchema, loginUserSchema } = require('../validators/userValidator');


// Health check route (Base route)
router.get('/', (req, res) => {
    res.status(200).json({
        message: '✅ LearnSphere auth route is working!'
    });
});

// Register Endpoint
router.post('/register', validateRequest(registerSchema), register);

// Login Endpoint
router.post('/login', validateRequest(loginSchema), login);

// Logout Endpoint
router.post('/logout', logout);

module.exports = router;