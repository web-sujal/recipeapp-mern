import { Router } from "express";
import { login, register, logout } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

export { router as userRouter };
