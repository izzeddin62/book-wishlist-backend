import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "dotenv";
import * as schema from "./schema";

config()

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const dbUrl = `postgresql://${DB_USER}${DB_PASSWORD ? `:${DB_PASSWORD}` : ''}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const client = postgres(dbUrl);

export const db = drizzle(client, { schema, logger: true});
