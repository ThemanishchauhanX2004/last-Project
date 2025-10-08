import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import fs from "fs";
import cloudinary from "../config/Cloudinary.js";
import User from "../Model/UserModel.js";

export async function signup(req, res) {
  try {
    const { firstName, lastName, userName, password } = req.body;

    if (!firstName || !userName || !password)
      return res.status(400).json({ message: "All required fields must be filled" });

    if (!validator.isStrongPassword(password))
      return res.status(400).json({ message: "Password must include uppercase, lowercase, number & special character" });

    let pictureUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "uploads" });
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
    const { userName, password } = req.body;

    // Admin login check
    if (userName === process.env.admin_username) {
      if (password !== process.env.admin_password) {
        return res.status(400).json({ message: "Invalid admin password", isAdmin: true });
      }
      const token = jwt.sign({ isAdmin: true }, process.env.SECRET_KEY, { expiresIn: "1d" });
      return res
        .cookie("token", token, { httpOnly: true, secure: false })
        .status(200)
        .json({ message: "Admin logged in", success: true, isAdmin: true });
    }

    // Normal user login
    const user = await User.findOne({ userName });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    res
      .cookie("token", token, { httpOnly: true, secure: false })
      .status(200)
      .json({
        message: "Logged in successfully",
        success: true,
        user: { id: user._id, firstName: user.firstName, lastName: user.lastName, userName: user.userName },
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}















export async function getProfile(req, res) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Please login first to continue" });

  try {
    const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodedUser.id).select("-password");
    if (!user) return res.status(401).json({ message: "Invalid token" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}
