const User = require("../models/userModel");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
dotenv.config();

//function to hash password
async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

// Function to verify a password
async function verifyPassword(inputPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(inputPassword, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
}

async function loginController(req, res) {
  const { username, password } = req.body;
  const findUser = await User.findOne({ username });
  if (!findUser) {
    return res.json({ status: 400, message: "Enter a valid username" });
  }
  const match = await verifyPassword(password, findUser.password);
  if (match) {
    const token = jwt.sign(
      {
        id: findUser._id,
        username: findUser.username,
        email: findUser.email,
        name: findUser.name,
      },
      process.env.JWT_SECRET_KEY
    );
    res.cookie("token", token);
    return res.json({
      status: 200,
      message: "logged in successfully!!",
      token,
    });
  }
  return res.json({ status: 400, message: "Incorrect password" });
}

async function registerController(req, res) {
  const { username, email, password, name } = req.body;
  if (!username || !password || !email || !name) {
    return res.status(400).json({ message: "Enter all details" });
  }
  try {
    // Check if username already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.json({
        status: 400,
        message: "Username with email or username already exists",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);
    // Save the user to the "database"
    const newUser = await User.create({
      username,
      email,
      name,
      password: hashedPassword,
    });
    const token = jwt.sign(
      {
        id: newUser._id,
        username: username,
        email: email,
        name: name,
      },
      process.env.JWT_SECRET_KEY
    );
    res.cookie("token", token, { httpOnly: false });
    res.json({ status: 200, message: "User registered successfully", token });
  } catch (error) {
    res.json({ status: 400, message: "Internal server error", error });
  }
}

module.exports = { loginController, registerController };
