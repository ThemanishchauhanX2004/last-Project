import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import gatConnection from "./Database/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routers/User.js";
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser())
app.use(express.json());
gatConnection();


// app.use("/products" , products)
app.use("/user" , userRouter)

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
