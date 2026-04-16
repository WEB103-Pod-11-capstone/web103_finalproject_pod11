import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { client } from "./config/database.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

app.use("/", userRouter);

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on Port: ${port}`));
