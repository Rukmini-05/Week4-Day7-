const express = require("express");
const router = express.Router();
const db = require("../db"); 

// GET all items
router.get("/", (req, res) => {
    const query = "SELECT * FROM items";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});

// GET single item by ID
router.get("/:id", (req, res) => {
    const query = "SELECT * FROM items WHERE id = ?";
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Item not found" });
        res.json(results[0]);
    });
});

// CREATE new item
router.post("/", (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required" });
    }
    const query = "INSERT INTO items (name, description) VALUES (?, ?)";
    db.query(query, [name, description], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: "Item created successfully", id: result.insertId });
    });
});

// UPDATE item
router.put("/:id", (req, res) => {
    const { name, description } = req.body;
    const query = "UPDATE items SET name = ?, description = ? WHERE id = ?";
    db.query(query, [name, description, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Item not found" });
        res.json({ message: "Item updated successfully" });
    });
});

// DELETE item
router.delete("/:id", (req, res) => {
    const query = "DELETE FROM items WHERE id = ?";
    db.query(query, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Item not found" });
        res.json({ message: "Item deleted successfully" });
    });
});

module.exports = router;