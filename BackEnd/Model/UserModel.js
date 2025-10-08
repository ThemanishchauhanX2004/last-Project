import mongoose, { Schema } from "mongoose";

let UserSchema = new Schema({
  firstName: { type: String, required: [true, "First name is required"] },
  lastName: { type: String },
  userName: { type: String, required: [true, "Username is required"], unique: [true, "Username already taken"] },
  password: { type: String, required: [true, "Please enter a password"], minlength: [9, "Password must be at least 9 characters"] },
  picture: { type: String },
}, { timestamps: true });

let User = mongoose.model("User", UserSchema);

export default User;