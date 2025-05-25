import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import  User  from "../models/userModel.js";

const verifyUser = async (email, password) => {
  try {
    //check for existing user
    const user = await User.findOne({ email }); 
    if (!user) {
      return { status: false, error: "User not found" };
    }
    console.log("User found", user);
    //password validation
    const isPasswordValid = await bcrypt.compare(password, user.password);

    
    if (!isPasswordValid) {
      return { status: false, error: "Invalid password" };
    }
    //token generation
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d", 
    });
    //password field removal
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    
    return { status: true, user:userWithoutPassword, token };

  } catch (error) {
    return {status: error,error : error.message}
  }
}
const createNewUser = async (userData) => {

  try {
    //check for existing user
    const user = await User.findOne({ email: userData.email });
    if(user){
      return {status:false,error:"User already exists"}
    }
    //hashing password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    //handle Image and pdf

    //create new user
    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
    })

    //token generation
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });

    //password field removal
    const { password, ...userWithoutPassword } = newUser.toObject();

    return { status: true, user: userWithoutPassword, token };
  } catch (error) {
    return { status: false, error: error.message };
  }
};
const verifyPassword = async (password, hash) => {}
const hashPassword = async (password) => {}
const generateToken = async (payload) => {}
const verifyToken = async (token) => {};
export {
  verifyPassword,
  hashPassword,
  generateToken,
  verifyToken,
  verifyUser,
  createNewUser,
};
