import { Router } from "express";
import { signupValidator } from "../validators/auth/signup.validator";
import { authController } from "../controllers/Auth.controller";
import { loginValidator } from "../validators/auth/login.validator";

const router = Router();

router.post("/signup", signupValidator, (req, res) => authController.signup(req, res));

router.post("/login", loginValidator, (req, res) => authController.login(req, res));


export default router;