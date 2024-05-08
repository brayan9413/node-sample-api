const express = require('express');
const user = require('../database-config/model.js');

// Router
const routerUser = express.Router();

// Get users
routerUser.get("/users", async (req, res) => {
  try {
    const users = await user.find({});
    res.json(users);
  } catch (error) {
    console.error("Error getting users", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create user
routerUser.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, birthDate } = req.body;
    const newUser = new user({
      firstName,
      lastName,
      birthDate,
    });

    await newUser.save();

    res.json({ message: "User created successfully" });
  } catch (error) {
    console.error("An error occurred while creating the user", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = { routerUser };