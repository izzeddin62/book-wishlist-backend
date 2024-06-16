import { AuthService, authService } from "../services/user/Auth.service";
import { Request, Response } from "express";
import { UserProperties } from "../services/user/User";
import { DuplicateValueError } from "../services/errors/duplicate-value.error";
import { AuthenticationError } from "../services/errors/authentication.error";

interface SignUpRequest extends Request {
  body: Omit<UserProperties, "id">;
}

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async signup(req: SignUpRequest, res: Response) {
    try {
      const userInfo = await this.authService.signup({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      const { password, ...userInfoWithoutPassword } = userInfo.user;
      res
        .status(201)
        .json({ user: userInfoWithoutPassword, token: userInfo.token });
    } catch (error) {
        if (error instanceof DuplicateValueError) {
            res.status(409).json({ error: error.message });
        }
        res.status(500).json({ message: "Server error. Please try again later" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const userInfo = await this.authService.login({
        email: req.body.email,
        password: req.body.password,
      });
      const { password, ...userInfoWithoutPassword } = userInfo.user;
      res.json({ user: userInfoWithoutPassword, token: userInfo.token });
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      res.status(500).json({ error: 'Server error' });
    }
  }
}

export const authController = new AuthController(authService);
