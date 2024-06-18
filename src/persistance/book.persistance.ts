import { and, eq } from "drizzle-orm";
import { db } from "../database/db";
import { BookTable, UserTable } from "../database/schema";
import { Book, BookProperties } from "../services/book/Book";
import { PostgresError } from "postgres";
import { NotFound } from "../services/errors/not-found.error";

type Row = {
  id: number;
  title: string;
  description: string;
  author: string;
  owner: number;
  genres: string[];
  imageUrl: string | null;
  done: boolean;
};

function rowToDomain(row: Row): Book {
  return new Book({
    id: row.id,
    title: row.title,
    author: row.author,
    description: row.description,
    owner: row.owner,
    genres: row.genres,
    imageUrl: row.imageUrl,
    done: row.done,
  });
}

export class BookPersistance {
  async create(data: Omit<BookProperties, "id" | "done">) {
    try {
      const { title, genres, owner, description, author, imageUrl } = data;
      const [book] = await db
        .insert(BookTable)
        .values({
          owner,
          description,
          genres,
          title,
          author,
          imageUrl: imageUrl,
        })
        .returning({
          id: BookTable.id,
          title: BookTable.title,
          owner: BookTable.owner,
          description: BookTable.description,
          genres: BookTable.genres,
          author: BookTable.author,
          imageUrl: BookTable.imageUrl,
          done: BookTable.done,
        });
      return rowToDomain(book);
    } catch (error) {
      if (error instanceof PostgresError && error.code === "23503") {
        throw new NotFound("book owner", "id", String(data.owner));
      }
      throw error;
    }
  }

  async getOneById(id: number, ownerId: number) {
    const [book] = await db
      .select()
      .from(BookTable)
      .where(and(eq(BookTable.id, id), eq(BookTable.owner, ownerId)));
    if (!book) {
      return null;
    }
    return rowToDomain(book);
  }

  async getMyBooks(ownerId: number) {
    const houses = await db
      .select()
      .from(BookTable)
      .where(eq(BookTable.owner, ownerId));
    return houses.map(rowToDomain);
  }

  async update(
    data: Partial<Omit<BookProperties, "id" | "owner">>,
    id: number,
    ownerId: number
  ) {
    const [book] = await db
      .update(BookTable)
      .set(data)
      .where(and(eq(BookTable.id, id), eq(BookTable.owner, ownerId)))
      .returning({
        id: BookTable.id,
        title: BookTable.title,
        owner: BookTable.owner,
        description: BookTable.description,
        genres: BookTable.genres,
        imageUrl: BookTable.imageUrl,
        author: BookTable.author,
        done: BookTable.done,
      });
    if (!book) {
      return null;
    }
    return rowToDomain(book);
  }

  async delete(id: number, ownerId: number) {
    const [book] = await db
      .delete(BookTable)
      .where(and(eq(BookTable.id, id), eq(BookTable.owner, ownerId)))
      .returning();
    
    if (!book) {
      return null;
    }
    return rowToDomain(book);
  }
}

export const housePersistance = new BookPersistance();
