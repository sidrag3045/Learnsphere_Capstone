const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Initializing Express app
const app = express();

// Loading env vars
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Health check route (Base route)
app.get('/', (req, res) => {
  res.send('✅ LearnSphere Server is Running!');
});

// Importing routes
const authRoutes = require('./routes/auth.routes');

// Using routes
app.use('/api/auth', authRoutes);


// Export app can be used by server.js or other modules. Also for testing purposes
module.exports = app;
