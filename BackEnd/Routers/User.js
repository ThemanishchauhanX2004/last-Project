import express from "express";
import { signup, login, getProfile, logout } from "../Controllers/User.js";
import upload from "../middleware/multer.js";
import password from "../middleware/passwordVrification.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", upload.single("picture"), signup);
userRouter.post("/login", password , login);
userRouter.get("/getProfile", authMiddleware, getProfile);
userRouter.post("/logout", logout);

export default userRouter;
