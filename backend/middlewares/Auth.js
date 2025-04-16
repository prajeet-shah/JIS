const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const AuthUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("token is invalid....");
    }

    const decodedMessage = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedMessage);
    const { id } = decodedMessage;
    const user = await User.findById(id);
    req.user = user;
    // console.log(req.user);

    if (!user) {
      throw new Error("user not found");
    } else {
      next();
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = { AuthUser };
