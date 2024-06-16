import { Request, Response } from "express";
import { BookService, bookService } from "../services/book/book.service";
import { NotFound } from "../services/errors/not-found.error";

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
      res.status(201).json({ book: book.getBookProperties() });
    } catch (error) {
        if (error instanceof NotFound) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: "Server error. Please try again later" });
    }
  }

  async getOneById(req: GetBookRequest, res: Response) {
    const { id } = req.params;
    const { id: userId } = req.user;
    const book = await this.bookService.getOneById(Number(id), userId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ book: book.getBookProperties() });
  }

  async getAll(req: GetBookRequest, res: Response) {
    const { id } = req.user;
    const books = await this.bookService.getAll(id);
    res.json({ books: books.map((book) => book.getBookProperties()) });
  }
}

export const bookController = new BookController(bookService);
