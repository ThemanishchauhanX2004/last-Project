import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import gatConnection from "./Database/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routers/User.js";
import ProductRouter from "./Routers/Products.js";


dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


gatConnection();

app.use("/user", userRouter);
app.use("/product", ProductRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
