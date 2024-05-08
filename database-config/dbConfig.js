const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error);
    throw error;
  }
}

module.exports = connectToDatabase;
