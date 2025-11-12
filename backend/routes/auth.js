const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Inscription
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user._id }, "secretkey123", { expiresIn: "1d" });
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Connexion
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, "secretkey123", { expiresIn: "1d" });
      res.json({ token, user });
    } else {
      res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
