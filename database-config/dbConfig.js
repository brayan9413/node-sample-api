const mongoose = require("mongoose");
const logger = require("../logger/logger.js");

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    logger.info("Successfully connected to the database");
  } catch (error) {
    logger.error("Error connecting to the database", error);
    throw error;
  }
}

module.exports = connectToDatabase;
