import User from "../Model/UserModel.js"; 
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import fs from "fs";
import cloudinary from "../config/Cloudinary.js";


export async function signup(req, res) {
  try {
    let { firstName, lastName, userName, password } = req.body;
    if (!firstName || !userName || !password) return res.status(400).json({ message: "All required fields must be filled" });
    if (!validator.isStrongPassword(password)) return res.status(400).json({ message: "Password must include uppercase, lowercase, number & special character" });

    let pictureUrl = "";
    if (req.file) {
      let result = await cloudinary.uploader.upload(req.file.path, { folder: "uploads" });
      pictureUrl = result.secure_url;
      fs.unlink(req.file.path, (err) => { if (err) console.log(err); });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ firstName, lastName, userName, password: hashedPassword, picture: pictureUrl });
    await user.save();

    return res.status(201).json({ message: "User registered successfully", success: true, data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}




export async function login(req, res) {
  try {
    let { userName, password } = req.body;
    let user = await User.findOne({ userName });
    if (!user) return res.status(404).json({ message: "User not found" });

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    let token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    res.cookie("token", token, { httpOnly: true, secure: false }).status(200).json({
      message: "Logged in successfully",
      success: true,
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, userName: user.userName }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export async function getProfile(req, res) {
  let token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Please login first to continue" });

  try {
    let decodedUser = jwt.verify(token, process.env.SECRET_KEY);
    let user = await User.findById(decodedUser.id).select("-password");
    if (!user) return res.status(401).json({ message: "Invalid token" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

// LOGOUT
export async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}
