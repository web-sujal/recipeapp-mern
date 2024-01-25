import { Router } from "express";
import { register } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post();

export { router as userRouter };
