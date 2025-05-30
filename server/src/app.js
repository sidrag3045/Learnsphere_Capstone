const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Initializing Express app
const app = express();

// Loading env vars
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check route (Base route)
app.get('/', (req, res) => {
  res.send('✅ LearnSphere Server is Running!');
});

// Additional routes can be added here
// ....

// Export app can be used by server.js or other modules. Also for testing purposes
module.exports = app;
