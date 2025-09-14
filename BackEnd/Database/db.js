import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function getConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI
    
    );
    console.log("MONGODB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error(" Connection failed due to:", error.message);
    
  }
}
