import { Request, Response } from "express";
import { BookService, bookService } from "../services/book/book.service";
import { NotFound } from "../services/errors/not-found.error";
import { BookProperties } from "../services/book/Book";

interface CreateBookRequest extends Request {
  body: Omit<BookProperties, "id"| "done">;
  user: {
    id: number;
  };
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

export class BookController {
  constructor(private bookService: BookService) {
    this.bookService = bookService;
  }

  async create(req: CreateBookRequest, res: Response) {
    try {
      const { title, author, description, genres, imageUrl } = req.body;
      const owner = req.user.id;
      const data = { title, author, owner, description, genres, imageUrl };
      const book = await this.bookService.create(data);
      return res.status(201).json({ book: book.getBookProperties() });
    } catch (error) {
        if (error instanceof NotFound) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Server error. Please try again later" });
    }
  }

  async getOneById(req: GetBookRequest, res: Response) {
    const { id } = req.params;
    const { id: userId } = req.user;
    const book = await this.bookService.getOneById(Number(id), userId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res.json({ book: book.getBookProperties() });
  }

  async getAll(req: GetBookRequest, res: Response) {
    const { id } = req.user;
    const books = await this.bookService.getAll(id);
    res.json({ books: books.map((book) => book.getBookProperties()) });
  }

  async update(req: UpdateBookRequest, res: Response) {
    const { id: bookId } = req.params;
    const { id: userId } = req.user;
    const data = req.body;
    const book = await this.bookService.update(Number(bookId), userId, data);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res.json({ book: book.getBookProperties() });
  }

  async delete(req: GetBookRequest, res: Response) {
    const { id: bookId } = req.params;
    const { id: userId } = req.user;
    const book = await this.bookService.delete(Number(bookId), userId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res.status(204).end();
  }
}

export const bookController = new BookController(bookService);
