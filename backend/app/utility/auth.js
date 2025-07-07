import { verifyUser, createNewUser } from "../services/authServices.js";

// Global helper
const isProduction = process.env.ENVIRONMENT === "deployment";

export const registerUser = async (req, res) => {
  try {
    const { name, password, confirmPassword, email } = req.body;

    console.log("Register attempted by:", req.body);

    if (
      !email ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    ) {
      return res.status(400).json({ message: "Bad request: Invalid input" });
    }

    const response = await createNewUser(req.body);

    if (!response.status) {
      return res.status(400).json({ message: response.error });
    }

    return res
      .status(201)
      .cookie("token", response.token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "None" : "Lax",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
      .json({
        message: "User registered successfully",
        user: response.user,
      });
  } catch (error) {
    return res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
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
      .cookie("token", response.token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "None" : "Lax",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
      .json({
        message: "User logged in successfully",
        user: response.user,
      });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
    });

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging out",
      error: error.message,
    });
  }
};

export const checkUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: req.user });
  } catch (error) {
    return res.status(500).json({
      message: "Error checking user",
      error: error.message,
    });
  }
};
