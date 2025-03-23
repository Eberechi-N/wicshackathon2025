const express = require("express");
const { createClient } = require("@supabase/supabase-js"); 
const app = express();
//All this cors stuff is to allow us to make requests from the frontend
const cors = require("cors");
const pool = require("./database"); // Import the database connection
//need this for auth database speficially
require("dotenv").config();

const corsOptions = {
    origin: ["http://localhost:5173"],
}

app.use(express.json()); 
app.use(cors(corsOptions));
//key for auth
const supabase = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_ANON_KEY
);

//signup route
app.post("/signup", async (req, res) => {
    const { email, password, username } = req.body;
  
    // Create user in Supabase auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (error) return res.status(400).json({ error: error.message });
  
    // Insert user profile into `profiles` table
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([{ id: data.user.id, username }]);
  
    if (profileError) return res.status(400).json({ error: profileError.message });
  
    res.json({ message: "Signup successful!", user: data.user });
  });



 //for checking login in
 app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Authenticate user
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Login successful!", user: data.user });
});

//for loginout
app.post("/logout", async (req, res) => {
    const { error } = await supabase.auth.signOut();
    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Logged out successfully!" });
});

//Fetches the current user profile attached to the id
app.get("/user", async (req, res) => {
    const { data, error } = await supabase.auth.getUser();
    if (error) return res.status(400).json({ error: error.message });

    res.json({ user: data.user });
});
 
//This is creating the route "/api"
//Then i think we are responding to requests to /api with the json
//holding the array called "fruits"
//I think maybe here is where you would connect to the database? and send
//requests between the databse and frontend through this? It may be worth 
//watching the video to see this part
app.get("/api/fruits", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM fruits"); // Fetch from the DB
        res.json(result.rows); // Send results as JSON to frontend
    } catch (error) {
        console.error("Error fetching fruits:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/")

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