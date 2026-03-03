// auth.js
const express = require("express");   
const router = express.Router();      

// your existing imports
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register Route
router.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Hash the password before saving
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: "User registered successfully" });
    });
});

// Login Route
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });

        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = result[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ message: "Login successful", token });
    });
});

module.exports = router;  