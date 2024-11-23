const express = require("express");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");

const taskRoutes = require("./route/task_route");
const userRoutes = require("./route/user_route");

const app = express();
app.use(express.json());

app.use(userRoutes);
app.use(taskRoutes);

const db_url = process.env.MONGO_URL;
const PORT = process.env.PORT_NO;

// Start the server
app.listen(PORT, function (err) {
  if (!err) {
    console.log(`Server is connected to port ${PORT}`);
  } else {
    console.log("Server encountered an error connecting to port");
  }
});

// Connect to MongoDB
async function connect() {
  try {
    await mongoose.connect(db_url);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Connection to DB caused error:", err.message);
  }
}
connect();
