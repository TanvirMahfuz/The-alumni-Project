import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

/**
 * Helper: Hash password
 */
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

/**
 * Helper: Verify password
 */
const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

/**
 * Helper: Generate JWT token
 */
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

/**
 * Helper: Verify JWT token
 */
const verifyToken = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Service: Authenticate user
 */
const verifyUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return { status: false, error: "User not found" };
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return { status: false, error: "Invalid password" };
    }

    const token = generateToken({ _id: user._id });

    const { password: _, ...userWithoutPassword } = user.toObject();

    return { status: true, user: userWithoutPassword, token };
  } catch (error) {
    console.error("Error in verifyUser:", error);
    return { status: false, error: "Internal server error" };
  }
};

/**
 * Service: Register new user
 */
const createNewUser = async (userData) => {
  try {
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      return { status: false, error: "User already exists" };
    }

    const hashedPassword = await hashPassword(userData.password);

    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
    });

    const token = generateToken({ _id: newUser._id });

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return { status: true, user: userWithoutPassword, token };
  } catch (error) {
    console.error("Error in createNewUser:", error);
    return { status: false, error: "Internal server error" };
  }
};

export {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
  verifyUser,
  createNewUser,
};
