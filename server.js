require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(" MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Default Route
app.get("/", (req, res) => {
    res.send(" Server is running!");
});
app.post("/evaluation-service/users", (req, res) => {
  res.send("User route is working!");
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
