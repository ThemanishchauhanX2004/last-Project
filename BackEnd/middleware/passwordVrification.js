import User from "../Model/UserModel.js";
import bcrypt from "bcryptjs";
export default async function password(req, res, next) {
  try {
    const { userName, password } = req.body;

    // Admin
    if (userName === process.env.admin_username) {
      if (password !== process.env.admin_password) {
        return res.status(400).json({ message: "invalid admin password", isAdmin: true });
      }
      return res.status(202).json({ message: "admin logged in", isAdmin: true });
    }

    // Normal user
    let user = await User.findOne({ userName });
    if (!user) return res.status(400).json({ message: "invalid credentials" });

    let isVerified = await bcrypt.compare(password, user.password);
    if (!isVerified) return res.status(400).json({ message: "invalid credentials" });

    req.body.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
