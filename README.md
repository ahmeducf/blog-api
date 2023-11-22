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
- Docker: Containerization technology.
- Docker Compose: Tool for defining and running multi-service Docker applications.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)
- [Git](https://git-scm.com/downloads)

### Installation

#### Option 1: Use Docker Compose

1. Clone the repository

```bash
git clone git@github.com:ahmeducf/blog-api.git
```

2. Navigate to the project directory

```bash
cd blog-api
```

3. Create a `secrets` directory and Add the following files with the appropriate values

- `db_uri_dev.token`: MongoDB URI for development
- `db_uri_prod.token`: MongoDB URI for production
- `id_rsa_priv`: Private key for JWT
- `id_rsa_pub`: Public key for JWT

4. Run `docker-compose` to start the service

- To start the service in development mode:

```bash
docker-compose -f docker-compose-dev.yml up
```

- To start the service in production mode:

```bash
docker-compose -f docker-compose-prod.yml up
```

#### Option 2: Run Locally

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

4. Generate public and private keys for JWT

```bash
node generate_keypair.js <path-to-parent-directory> # e.g. ./secrets
```

5. Populate the database with some sample data

```bash
node populate_db.js <your-mongodb-uri>
```

6. Create a `.env` file in the root directory and add the following environment variables

```bash
NODE_ENV=<development | production>
DB_URI_FILE=<path-to-db-uri-file> # e.g. ./secrets/db_uri_dev.token
JWT_PRIVATE_KEY_FILE=<path-to-private-key-file> # e.g. ./secrets/id_rsa_priv
JWT_PUBLIC_KEY_FILE=<path-to-public-key-file> # e.g. ./secrets/id_rsa_pub
TEST_USERNAME=<your-test-username>
TEST_PASSWORD=<your-test-password>
```

7. Run the tests

```bash
npm test
```

8. Start the server

- In development mode:

```bash
npm run dev
```

- In production mode:

```bash
npm start
```

## If I have time

- Create a blog frontend to consume the API.
- Create an admin dashboard frontend to manage the blog.
- Support comments on posts.
- Create Swagger documentation for the API.
- Use Nginx as a reverse proxy server.
- Use Redis for caching.
- Use a CI/CD tool to automate the deployment process.
