const express = require("express");
const app = express();
//All this cors stuff is to allow us to make requests from the frontend
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"],
}

app.use(cors(corsOptions));

//This is creating the route "/api"
//Then i think we are responding to requests to /api with the json
//holding the array called "fruits"
//I think maybe here is where you would connect to the database? and send
//requests between the databse and frontend through this? It may be worth 
//watching the video to see this part
app.get("/api", (req, res) => {
    res.json({"fruits": ["apple", "orange", "banana"]});
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});