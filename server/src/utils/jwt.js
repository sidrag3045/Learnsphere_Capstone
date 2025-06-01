const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const SECRET = process.env.JWT_SECRET;
const EXPIRATION = process.env.JWT_EXPIRATION || '7h';

// Load environment variables from .env file
dotenv.config();

// function to generate JWT
const generateToken = (payload) => jwt.sign(payload, SECRET, { expiresIn : EXPIRATION });

// function to verify JWT
const verifyToken = (token) => jwt.verify(token, SECRET);

module.exports = { generateToken, verifyToken };


