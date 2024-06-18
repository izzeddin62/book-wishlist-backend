import { Request, Router } from "express";
import { getBookValidator, createBookValidator, updateBookValidator } from "../validators/book";
import { bookController } from "../controllers/Book.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { JwtPayload } from "jsonwebtoken";
import { BookProperties } from "../services/book/Book";

interface CreateBookRequest extends Request {
    body: Omit<BookProperties, "id"| "done">;
    user: {
        id: number;
    }
}

interface UpdateBookRequest extends Request {
    body: Partial<Omit<BookProperties, "id" | "done">>;
    user: {
      id: number;
    };
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
router.patch("/:id", (req, res, next) => authMiddleware(req as unknown as MyRequest, res, next), updateBookValidator, (req, res) => bookController.update(req as unknown as UpdateBookRequest, res));
router.delete("/:id", (req, res, next) => authMiddleware(req as unknown as MyRequest, res, next), (req, res) => bookController.delete(req as unknown as GetBookRequest, res));

export default router;
