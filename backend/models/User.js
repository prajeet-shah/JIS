const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["registrar", "judge", "lawyer"] },
  viewedCases: { type: Number, default: 0 }, // For lawyers
});

module.exports = mongoose.model("User", userSchema);
