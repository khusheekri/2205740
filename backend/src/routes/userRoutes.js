const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /users - Create a new user
router.post("/", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
});

module.exports = router;

