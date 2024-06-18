# Book wishlist backend

## Project description
This project is a backend application for managing a book wishlist. It is built using TypeScript, Express.js, PostgreSQL, and Drizzle ORM. The application allows users to create an account, login, view a list of books, add new books, update existing books, and delete books. Authentication is implemented using tokens, which need to be included in the request headers for protected routes.

the frontend of this project can be found [here](https://github.com/izzeddin62/book-wishlist)

## Project Setup
1. Clone the repository: `git clone https://github.com/izzeddin62/book-wishlist-backend.git`
2. Navigate into the project directory: `cd book-wishlist-backend`
3. Create a new .env file and copy the contents of .env.example into it.
3. Install the dependencies: `npm install`

## Database Setup
1. Install PostgreSQL.
2. Create a new database: `createdb <database-name>`
3. Update .env with the new database configurations.
4. Generate migration: `npm run db:generate`
5. Run migration: `npm run db:migrate`

## Database Setup

1. Install PostgreSQL.
2. Create a new database: `createdb <database-name>`
3. Update .env in with the new database configurations.
4. generate migration: `npm run db:generate`
5. run migration: `npm run db:migrate`

## Endpoints
For more information on the endpoints, please refer to the [API documentation](https://documenter.getpostman.com/view/8238232/2sA3XSCMFu)

## Post /api/auth/signup
Create a new user account. The body of the request should following details:
- firstName
- lastName
- email
- password

it returns a token that you can use to authenticate future requests.

## Post /api/auth/login
Login to the application. The body of the request should include the following details:
- email
- password

it returns a token that you can use to authenticate future requests.

### GET /api/books

Returns a list of all books. This is a protected route, so you need to include the token in the request headers.


### POST /api/books

Creates a new book. The body of the request should include the book details. This is a protected route, so you need to include the token in the request headers.

You will need to include the following details in the body of the request:
- title
- author
- genre
- description
- imageUrl(optional)



### PATCH /api/books/:id

Updates the book with the given ID. The body of the request should include the updated book details. This is a protected route, so you need to include the token in the request headers.

You will need to include the following details in the body of the request:
- title(optional)
- author(optional)
- genre(optional)
- description(optional)
- imageUrl(optional)

### DELETE /api/books/:id

Deletes the book with the given ID. This is a protected route, so you need to include the token in the request headers.

# project structure
The project entry point is `src/index.ts`. The project is structured as follows:

- `src/controllers`: This directory contains the controller functions for the application.
- `src/database`: This directory contains the database configuration and migrations.
- `src/middleware`: This directory contains the middleware functions for the application. ex: authentication middleware
- `src/routes`: This directory contains the route definitions for the application.
- `src/services`: This directory contains the service functions for the application.
    - `src/services/auth`: This directory contains the authentication service functions.
    - `src/services/books`: This directory contains the book service functions.

## Running the Project

1. Start the server: `npm run dev`
2. The server will be running at `http://localhost:3000` (or whatever port you have configured).