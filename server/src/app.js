const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

// Load env vars
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.send('✅ LearnSphere Server is Running!');
});

// Export app to be used by server.js (if needed later)
module.exports = app;

// Start server if run directly
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
