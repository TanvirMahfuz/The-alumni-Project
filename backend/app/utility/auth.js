import { verifyUser, createNewUser } from "../services/authServices.js";

export const registerUser = async (req, res) => {
  try {
    let { password, confirmPassword, email } = req.body;

    if (password !== confirmPassword || !password || !confirmPassword || !email)
      return res.status(400).json({ message: "bad request" });

    const response = await createNewUser(req.body);

    if (response.status === false) {
      return res.status(400).json({ message: response.error });
    }

    res
      .status(201)
      .cookie("token", response.token, { httpOnly: true, secure: true })
      .json({ message: "User registered successfully", user: response.user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};
const login = async (req, res) => {
  console.log("login attempted.by :",req.body);
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Bad request" });
    }
    const response = await verifyUser(email, password);
    if (response.status === false) {
      return res.status(401).json({ message: response.error });
    }

    return res
      .status(200)
      .cookie("token", response.token, {
        httpOnly: true,
        secure: true,
      })
      .json({message: "User logged in successfully", user:response.user});
  } catch (error) {
    res.status(500).json({message: "Error logging in", error: error.message});
  }
};
const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({message: "User logged out successfully"});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging out", error: error.message });
    
  }
};
export const checkUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: req.user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

export {login, logout};
