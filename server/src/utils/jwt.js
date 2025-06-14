const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const SECRET = process.env.JWT_SECRET;
const EXPIRATION = process.env.JWT_EXPIRATION || '7h';



// generate JWT
const generateToken = (payload) => jwt.sign(payload, SECRET, { expiresIn : EXPIRATION });

// verify JWT
const verifyToken = (token) => jwt.verify(token, SECRET);

module.exports = { generateToken, verifyToken };


