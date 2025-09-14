import express from "express";
import {signup , login , getProfile , logout}  from "../Controllers/User.js";
import upload from "../middleware/multer.js";

let userRouter = express.Router();

userRouter.post("/signup",upload.single("picture") ,signup);
userRouter.post("/login", login);  
userRouter.get("/getProfile", getProfile);
userRouter.post("/logout", logout);

export default userRouter;
