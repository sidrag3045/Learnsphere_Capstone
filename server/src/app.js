const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');

// Initializing Express app
const app = express();

// Loading env vars
dotenv.config();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Health check route (Base route)
app.get('/', (req, res) => {
  res.send('✅ LearnSphere Server is Running!');
});

// Importing routes
const authRoutes = require('./routes/auth.routes');
const courseRoutes = require('./routes/course.routes');
const moduleRoutes = require('./routes/module.routes');
const lessonRoutes = require('./routes/lesson.routes');
const enrollmentRoutes = require('./routes/enrollment.routes');
const progressRoutes = require('./routes/progress.routes');

// Using routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/progress', progressRoutes);

// Basic 404 - Not Found handler
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Error handling middleware
app.use(errorHandler);

// Export app can be used by server.js or other modules. Also for testing purposes
module.exports = app;
