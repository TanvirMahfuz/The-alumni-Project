import { verifyUser, createNewUser } from "../services/authServices.js";

// Global helper
const isProduction = process.env.ENVIRONMENT === "deployment";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "None" : "Lax",
};

const TOKEN_MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days, matches JWT expiry

export const registerUser = async (req, res) => {
  try {
    const { name, password, confirmPassword, email, session } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    ) {
      return res.status(400).json({ message: "Bad request: Invalid input" });
    }

    if (typeof password !== "string" || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Only whitelisted fields reach the database (no isAdmin, posts, etc.)
    const response = await createNewUser({ name, email, password, session });

    if (!response.status) {
      return res.status(400).json({ message: response.error });
    }

    return res
      .status(201)
      .cookie("token", response.token, { ...cookieOptions, maxAge: TOKEN_MAX_AGE })
      .json({
        message: "User registered successfully",
        user: response.user,
      });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Bad request: Email and password required" });
    }

    const response = await verifyUser(email, password);

    if (!response.status) {
      return res.status(401).json({ message: response.error });
    }

    return res
      .status(200)
      .cookie("token", response.token, { ...cookieOptions, maxAge: TOKEN_MAX_AGE })
      .json({
        message: "User logged in successfully",
        user: response.user,
      });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Error logging in" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", cookieOptions);
  return res.status(200).json({ message: "User logged out successfully" });
};

export const checkUser = async (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user: req.user });
};
