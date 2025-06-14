const express = require('express');
const router = express.Router();
const { register, login, logout, getCurrentUser } = require('../controllers/authController');
const { validateRequest } = require('../middlewares/validateRequest');
const { registerUserSchema, loginUserSchema } = require('../validators/userValidator');
const { verifyJWT } = require('../middlewares/authMiddleware');


// Health check route (Base route)
router.get('/', (req, res) => {
    res.status(200).json({
        message: '✅ LearnSphere auth route is working!'
    });
});

// Register Endpoint
// POST /api/auth/register
router.post('/register', validateRequest(registerUserSchema), register);

// Login Endpoint
// POST /api/auth/login
router.post('/login', validateRequest(loginUserSchema), login);

// GET /api/auth/me
router.get('/me', verifyJWT, getCurrentUser);

// Logout Endpoint
// POST /api/auth/logout
router.post('/logout', verifyJWT, logout);

module.exports = router;