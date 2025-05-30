const app = require('./app');
const loadDatabase = require('./loaders/database');

const PORT = process.env.SERVER_PORT || 5000;

async function startServer() {
  try {
    // Connecting to DB
    await loadDatabase();

    // We can also load other initializers here later
    // e.g., loadCronJobs(), loadCloudinary(), etc.

    // Starting the Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
