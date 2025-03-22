const express = require("express");
const app = express();
//All this cors stuff is to allow us to make requests from the frontend
const cors = require("cors");
const pool = require("./database"); // Import the database connection

const corsOptions = {
    origin: ["http://localhost:5173"],
}

app.use(express.json()); 
app.use(cors(corsOptions));

//This is creating the route "/api"
//Then i think we are responding to requests to /api with the json
//holding the array called "fruits"
//I think maybe here is where you would connect to the database? and send
//requests between the databse and frontend through this? It may be worth 
//watching the video to see this part
app.get("/api/fruits", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM fruits"); // Fetch from the DB
        res.json(result.rows); // Send results as JSON
    } catch (error) {
        console.error("Error fetching fruits:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//where u can insert data
app.post("/api/fruits", async (req, res) => {
    const { name } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO fruits (name) VALUES ($1) RETURNING *",
            [name]
        );
        res.json(result.rows[0]); // Send back the inserted fruit
    } catch (error) {
        console.error("Error adding fruit:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(8080, () => {
    console.log("Server started on port 8080");
});