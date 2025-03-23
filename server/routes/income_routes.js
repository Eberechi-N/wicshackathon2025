const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/auth");
const pool = require("../database"); // Database connection

// Fetch all income for the logged-in user
router.get("/", authenticateUser, async (req, res) => {

    try {
        const result = await pool.query("SELECT * FROM income WHERE user_id = $1", [req.user.id]);
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching income:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Insert new income
router.post("/", authenticateUser, async (req, res) => {

    const { name, amount, account_id, category } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO income (user_id, name, amount, account_id, category) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [req.user.id, name, amount, account_id, category]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Update income entry
router.put("/:id", authenticateUser, async (req, res) => {

    const { id } = req.params;
    const { name, amount, account_id, category } = req.body;

    try {
        const result = await pool.query(
            "UPDATE income SET name = $1, amount = $2, account_id = $3, category = $4 WHERE id = $5 AND user_id = $6 RETURNING *",
            [name, amount, account_id, category, id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Income entry not found or not authorized" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error updating income:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete income entry
// router.delete("/:id", authenticateUser, async (req, res) => {
    router.delete("/:id", async (req, res) => {

    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM income WHERE id = $1 AND user_id = $2 RETURNING *",
            [id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Income entry not found or not authorized" });
        }

        res.json({ message: "Income entry deleted successfully" });
    } catch (error) {
        console.error("Error deleting income:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
