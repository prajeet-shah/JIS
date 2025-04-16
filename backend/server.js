const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/database");
const authRouter = require("./routes/authRoute");
const profileRouter = require("./routes/profileRoute");
const caseRouter = require("./routes/caseRoute");

const app = express();
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "https://jis-sj13.vercel.app",
];
//const allowedOrigins = "http://localhost:5173";
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.send("API is running..."));
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/api/cases", caseRouter);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("Database Connection Established....");
    app.listen(5000, () => {
      console.log("server running on the port 5000");
    });
  })
  .catch((err) => console.log("Database not connected successfully!"));
