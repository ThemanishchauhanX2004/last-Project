import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

let UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
  },
  userName: {
    type: String,
    unique: [true, "Username already taken"],
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [9, "Password must be at least 9 characters long"],
  },
  picture: {
    type: String,
  },
}, { timestamps: true });

let User = mongoose.model("User", UserSchema);

export default User
