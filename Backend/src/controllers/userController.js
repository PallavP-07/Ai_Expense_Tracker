import jwt from "jsonwebtoken";
import CreateUserSchema from "../models/UserModel.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ✅ Register
export const registerUser = async (req, res) => {
  const {fullname, uname, email, password } = req.body;

  if (!fullname||!uname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existing = await CreateUserSchema.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await CreateUserSchema.create({ uname, email, password });
    res.status(201).json({
      message: "User registered",
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await CreateUserSchema.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Current User
export const getUser = async (req, res) => {
  try {
    const user = await CreateUserSchema.findById(req.user.id).select(
      "-password"
    );
    res.json(user);
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete User
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
