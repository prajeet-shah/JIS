const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/database");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("Database Connection Established....");
    app.listen(5000, () => {
      console.log("server running on the port 5000");
    });
  })
  .catch((err) => console.log("Database not connected successfully!"));
