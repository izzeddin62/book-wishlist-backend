import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { config } from "dotenv";
import postgres = require("postgres");
config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const dbUrl = `postgresql://${DB_USER}${DB_PASSWORD ? `:${DB_PASSWORD}` : ''}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const migrationClient = postgres(dbUrl, { max: 1 });

async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./src/database/migrations",
  });

  await migrationClient.end();
}

main();
