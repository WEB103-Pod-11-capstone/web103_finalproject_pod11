import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { client } from "./config/database.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", cartRouter);
app.use("/api", orderRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on Port: ${port}`));
