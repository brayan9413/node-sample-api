const express = require("express");
const user = require("../database-config/model.js");
const logger = require("../logger/logger.js");
const { databaseResponseTimeHistogram } = require("../metrics/metrics.js");

// Router
const routerUser = express.Router();

// Get users
routerUser.get("/users", async (req, res) => {
  const metricsOperation = "GET_USERS";
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const users = await user.find({});

    timer({ operation: metricsOperation, success: true });
    logger.info("Success - get users", users);
    res.json(users);
  } catch (error) {
    timer({ operation: metricsOperation, success: false });
    logger.error("Error getting users", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create user
routerUser.post("/register", async (req, res) => {
  const metricsOperation = "REGISTER_USER";
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const { firstName, lastName, birthDate } = req.body;
    const newUser = new user({
      firstName,
      lastName,
      birthDate,
    });

    await newUser.save();

    timer({ operation: metricsOperation, success: true });
    logger.info("new user created", { firstName, lastName, birthDate });
    res.json({ message: "User created successfully" });
  } catch (error) {
    timer({ operation: metricsOperation, success: false });
    logger.error("An error occurred while creating the user", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = { routerUser };
