import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  serial,
  varchar,
  unique,
  text,
  boolean,
} from "drizzle-orm/pg-core";

export const UserTable = pgTable("user", {
  id: serial("id").primaryKey().notNull().unique(),
  first_name: varchar("first_name").notNull(),
  last_name: varchar("last_name").notNull(),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
});

export const BookTable = pgTable("book", {
  id: serial("id").primaryKey().notNull().unique(),
  title: varchar("title").notNull(),
  author: varchar("author").notNull(),
  owner: integer("owner")
    .notNull()
    .references(() => UserTable.id),
  description: varchar("description").notNull(),
  genres: text("genres")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  imageUrl: varchar("image_url"),
  done: boolean("done").notNull().default(false),
});
