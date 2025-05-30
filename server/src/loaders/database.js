const sequelize = require('../config/db');

// This file is responsible for establishing a connection to the database using Sequelize.
const loadDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.... ✅');
  } catch (error) {
    console.error('Unable to connect to the database ❌ : ', error);
    process.exit(1); // Exit the app if DB connection fails
  }
};

module.exports = loadDatabase;
