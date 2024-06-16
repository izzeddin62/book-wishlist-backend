import { Request, Router } from "express";
import { getBookValidator, createBookValidator } from "../validators/book";
import { bookController } from "../controllers/Book.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { int } from "drizzle-orm/mysql-core";
import { JwtPayload } from "jsonwebtoken";

interface CreateBookRequest extends Request {
    body: {
        title: string;
        author: string;
        description: string;
        genres: string[];
        imageUrl: string | null;
    };
    user: {
        id: number;
    }
}

interface GetBookRequest extends Request {
    user: {
        id: number;
    };
}

interface MyRequest extends Request {
    user: string | JwtPayload;
  }




const router = Router();

router.get("/:id", (req, res, next) => authMiddleware(req as MyRequest, res, next), getBookValidator, (req, res) =>
  bookController.getOneById(req as GetBookRequest, res)
);
router.get("/", (req, res, next) => authMiddleware(req as MyRequest, res, next), (req, res) => bookController.getAll(req as GetBookRequest, res));
router.post("/", (req, res, next) => authMiddleware(req as MyRequest, res, next), createBookValidator, (req, res) => bookController.create(req as CreateBookRequest, res));

export default router;
