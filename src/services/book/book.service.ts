import { BookPersistance } from "../../persistance/book.persistance";
import { Book, BookProperties } from "./Book";

export class BookService {

    constructor(private bookRepository: BookPersistance) {
        this.bookRepository = bookRepository;
    }

    create(data: Omit<BookProperties, "id" | "done">) {
        return this.bookRepository.create(data);
    }

    getOneById(id: number, ownerId: number) {
        return this.bookRepository.getOneById(id, ownerId);
    }

    getAll(ownerId: number) {
        return this.bookRepository.getMyBooks(ownerId);
    }

    update(bookId: number, ownerId: number, data: Partial<Omit<BookProperties, "id" | "done">>) {
        return this.bookRepository.update(data, bookId, ownerId);
    }

    delete(bookId: number, ownerId: number) {
        return this.bookRepository.delete(bookId, ownerId);
    }
}

export const bookService = new BookService(new BookPersistance());