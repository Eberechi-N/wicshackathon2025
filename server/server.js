require("dotenv").config();
const express = require("express");
const { createClient } = require("@supabase/supabase-js"); 
const app = express();
//All this cors stuff is to allow us to make requests from the frontend
const cors = require("cors");
const pool = require("./database"); // Import the database connection
//need this for auth database speficially
const auth = require("./middleware/auth");
const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true
}
//key for auth
const supabase = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_SERVICE_ROLE_KEY 
);

const incomeRoutes = require("./routes/income_routes"); 
const expenseRoutes = require("./routes/expense_routes");

app.use(express.json()); 
app.use(cors(corsOptions));

app.use("/api/income", auth, incomeRoutes); // Register income routes
app.use("/api/expenses", auth, expenseRoutes); // Register expense routes


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
  
    res.json({ message: "Signup successful!",  token: data.session.access_token,  });
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

    res.json({ message: "Login successful!", token: data.session.access_token, });
    //if email verifcation is on then token: data.session?.access_token || null, but its not
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




app.listen(8080, () => {
    console.log("Server started on port 8080");
});
