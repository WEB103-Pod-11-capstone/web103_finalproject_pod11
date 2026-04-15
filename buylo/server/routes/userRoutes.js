import { Router } from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
} from "../controller/userController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = Router();

userRouter.route("/users").get(authMiddleware, getAllUsers);
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

export default userRouter;
