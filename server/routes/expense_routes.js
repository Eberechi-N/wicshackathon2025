const express = require("express");
const router = express.Router();
const pool = require("../database"); // Database connection

//Fetch all accoutns for loggined user
router.get("/accounts", async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ error: "Unauthorized: No user ID found" });
        }

        // Get user's account names
        const result = await pool.query(
            "SELECT name FROM accounts WHERE user_id = $1",
            [req.user.id]
        );

        res.json(result.rows); // Send account names to frontend
    } catch (error) {
        console.error("Error fetching accounts:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Fetch all expenses for the logged-in user
router.get("/", async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ error: "Unauthorized: No user ID found" });
        }

        const result = await pool.query(
            "SELECT id, name, amount, category, account_name, emoji FROM expenses WHERE user_id = $1",
            [req.user.id]
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Insert new expense
router.post("/", async (req, res) => {
    const { name, amount, category, account_name, emoji } = req.body;

    if (!req.user?.id) {
        return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    if (!name || !amount || !category || !account_name) {
        return res.status(400).json({ error: "Missing required fields (name, amount, category, account_name)" });
    }

    try {
        const result = await pool.query(
            "INSERT INTO expenses (user_id, name, amount, category, account_name, emoji) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [req.user.id, name, amount, category, account_name, emoji]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update expense entry
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, amount, account_id, category, emoji, account } = req.body;

    if (!req.user?.id) {
        return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    try {
        const result = await pool.query(
            "UPDATE expenses SET name = $1, amount = $2, account_id = $3, category = $4, emoji = $5 WHERE id = $6 AND user_id = $7 RETURNING *",
            [name, amount, account_id, category, emoji, id, req.user.id, account.name]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Expense entry not found or not authorized" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error updating expense:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete expense entry
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    if (!req.user?.id) {
        return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    try {
        const result = await pool.query(
            "DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING *",
            [id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Expense entry not found or not authorized" });
        }

        res.json({ message: "Expense entry deleted successfully" });
    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
