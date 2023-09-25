# Blog API

A RESTFul API for a blog, built with Express and MongoDB.

## Table of Contents

| Section                                 | Description                             |
| --------------------------------------- | --------------------------------------- |
| [API Endpoints](#api-endpoints)         | List of API endpoints                   |
| [API Documentation](#api-documentation) | Link to API documentation               |
| [Features](#features)                   | List of features                        |
| [Technologies Used](#technologies-used) | List of technologies used               |
| [Getting Started](#getting-started)     | Instructions for setting up the project |
| [Knowledge Gained and Applied](#knowledge-gained-and-applied) | List of skills learned and applied |

## API Endpoints

### Posts

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/posts`     | Get all posts     |
| GET    | `/api/posts/:id` | Get a single post |
| POST   | `/api/posts`     | Create a new post |
| PUT    | `/api/posts/:id` | Update a post     |
| DELETE | `/api/posts/:id` | Delete a post     |

### Auth

| Method | Endpoint                  | Description          |
| ------ | ------------------------- | -------------------- |
| POST   | `/api/auth/login`         | Login a user         |
| POST   | `/api/auth/refresh_token` | Refresh access token |

## API Documentation

Read the [API documentation](./api_specification/) for more information.

## Features

- Token-based authorization.
- Password hashing.
- Request rate limiting.
- Request validation and sanitization.
- Response compression.
- Response filtering, sorting, and pagination.
- Standardized error responses.
- Cross-Origin Resource Sharing (CORS).

## Technologies Used

- Node.js: JavaScript runtime environment.
- Express: Web application framework.
- MongoDB: NoSQL database.
- Mongoose: MongoDB object modeling tool.
- JWT: JSON Web Token for authentication and authorization.
- Bcrypt: Password hashing function.
- Jest: Testing framework.
- Supertest: HTTP assertions library.
- ThunderClient: REST client for API testing.
- ESLint: Linter tool.
- Prettier: Code formatter.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)
- [Git](https://git-scm.com/downloads)

### Installation

1. Clone the repository

```bash
git clone git@github.com:ahmeducf/blog-api.git
```

2. Navigate to the project directory

```bash
cd blog-api
```

3. Install dependencies

```bash
npm install
```

4. Create a `.env` file in the root directory and add the following environment variables

```bash
NODE_ENV="development"
DB_URI_DEV=<your-mongodb-uri>
TEST_USERNAME=<your-test-username>
TEST_PASSWORD=<your-test-password>
```

5. Generate public and private keys for JWT

```bash
node generate_keypair.js
```

6. Populate the database with some sample data

```bash
node populate_db.js
```

7. Run the tests

```bash
npm test
```

8. Start the server in development mode

```bash
npm run dev
```

## Knowledge Gained and Applied

- How to build a RESTFul API with Node.js and Express.
- How to use MongoDB and Mongoose to store and query data.
- How to implement token-based authorization with JWT.
- How to enable CORS in an Express app.
- How to hash passwords with Bcrypt.
- How to validate and sanitize user input.
- How to handle errors and send standardized responses.
- How to test routers and controllers with Jest and Supertest.
- How to test database operations with MongoDB Memory Server.
- How to use ESLint and Prettier to maintain code quality.
- How to prevent common security vulnerabilities.
- How to prepare a Node.js app for production.

## If I have time

- Create a blog frontend to consume the API.
- Create an admin dashboard frontend to manage the blog.
- Support comments on posts.
- Create Swagger documentation for the API.
