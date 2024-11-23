import bcrypt from "bcryptjs";
import * as userServices from "../services/userServices.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userServices.findAllUser();
    if (!users) {
      return res.status(404).json({message: "No users found"});
    }
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({message: "Error fetching users", error: error.message});
  }
};
export const getOneUser = async (req, res) => {
  try {
    const users = await userServices.findOneUser({_id: req.body.id});
    if (!users) {
      return res.status(404).json({message: "User not found"});
    }
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({message: "Error fetching users", error: error.message});
  }
};
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      image,
      bio,
      contacts,
      currentPost,
      JobExperience,
      haveWorkedIn,
      currentlyWorkingIn,
      futureInterests,
      availableForWork,
      projects,
      resume,
    } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({message: "Passwords do not match"});
    }

    const existingUser = await userServices.findOneUser({email});
    if (existingUser) {
      return res.status(400).json({message: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userServices.createUser({
      name,
      email,
      password: hashedPassword,
      image,
      bio,
      contacts,
      currentPost,
      JobExperience,
      haveWorkedIn,
      currentlyWorkingIn,
      futureInterests,
      availableForWork,
      projects,
      resume,
    });
    if (!newUser) {
      return res.status(500).json({message: "Error registering user"});
    }
    const token = jwt.sign(
      {name: newUser.name, userMail: newUser.email},
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log(newUser);
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
      })
      .json({message: "User registered successfully", user: newUser});
  } catch (error) {
    res
      .status(500)
      .json({message: "Error registering user", error: error.message});
  }
};

export const updateUser = async (req, res) => {
  const {id, body} = req.body;
  const user = await userServices.findOneUser({_id: id});
  if (!user) {
    return res.status(404).json({message: "User not found"});
  }
  const updatedUser = await userServices.updateUser({_id: id}, body, {
    new: true,
  });
  if (!updatedUser) {
    return res.status(500).json({message: "Error updating user"});
  }
  console.log(updatedUser);
  res
    .status(200)
    .json({message: "User updated successfully", user: updatedUser});
};
