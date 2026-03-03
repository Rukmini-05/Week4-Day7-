const express = require("express");
const app = express();
require("dotenv").config();
const authRoutes = require("./routes/auth");  
const dashboardRoute = require("./routes/dashboard"); 
const db = require("./db");

// Middleware
app.use(express.json()); 

// Routes
app.use("/api/auth", authRoutes); 
app.use("/dashboard", dashboardRoute);

// Test route
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});