import express from "express"
import { userLogin, userSignUp } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/sign-up", userSignUp);
userRoute.post("/login", userLogin);


export default userRoute