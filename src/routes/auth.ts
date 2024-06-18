import { Request, Router } from "express";
import { signupValidator } from "../validators/auth/signup.validator";
import { authController } from "../controllers/Auth.controller";
import { loginValidator } from "../validators/auth/login.validator";
import { authMiddleware } from "../middlewares/auth.middleware";

interface GetUserRequest extends Request {
    user: {
      id: number;
    }
  }

const router = Router();



router.post("/signup", signupValidator, (req, res) => authController.signup(req, res));

router.post("/login", loginValidator, (req, res) => authController.login(req, res));

router.get("/me", (req, res, next) => authMiddleware(req as GetUserRequest, res, next), (req, res) => authController.getUser(req as GetUserRequest, res));


export default router;