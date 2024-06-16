import { BookPersistance } from "../../persistance/book.persistance";
import { Book, BookProperties } from "./Book";

export class BookService {

    constructor(private bookRepository: BookPersistance) {
        this.bookRepository = bookRepository;
    }

    create(data: Omit<BookProperties, "id">) {
        return this.bookRepository.create(data);
    }

    getOneById(id: number, ownerId: number) {
        return this.bookRepository.getOneById(id, ownerId);
    }

    getAll(ownerId: number) {
        return this.bookRepository.getMyBooks(ownerId);
    }
}

export const bookService = new BookService(new BookPersistance());