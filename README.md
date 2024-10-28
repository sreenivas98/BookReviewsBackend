# Book Store API

## Overview
This is a simple RESTful API for managing books and user authentication in an online book store. It supports user registration, login, fetching book information, and managing book reviews. Authentication is handled using JWT tokens for secure access to protected routes.

## Installation
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the server:
    ```bash
    node index.js
    ```
   The server runs on `http://localhost:5000`.

## API Endpoints

### Public Endpoints
The following endpoints are accessible to all users, without authentication.

---

#### **Register User**
- **URL:** `/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
    ```json
    {
        "username": "your_username",
        "password": "your_password"
    }
    ```
- **Responses:**
  - `200 OK`: User successfully registered.
  - `404 Not Found`: Username already exists or missing information.
  
#### **Get All Books**
- **URL:** `/`
- **Method:** `GET`
- **Description:** Retrieves a list of all books.
- **Responses:**
  - `200 OK`: Returns an array of books.

#### **Get Book by ISBN**
- **URL:** `/isbn/:isbn`
- **Method:** `GET`
- **Description:** Retrieves details of a book by its ISBN.
- **Parameters:**
  - `isbn` - ISBN of the book.
- **Responses:**
  - `200 OK`: Book details.
  - `403 Forbidden`: No book found with the given ISBN.

#### **Get Books by Author**
- **URL:** `/author/:author`
- **Method:** `GET`
- **Description:** Retrieves a list of books by a specific author.
- **Parameters:**
  - `author` - Author of the books.
- **Responses:**
  - `200 OK`: Books by the specified author.
  - `403 Forbidden`: No books found by the specified author.

#### **Get Books by Title**
- **URL:** `/title/:title`
- **Method:** `GET`
- **Description:** Retrieves a list of books by their title.
- **Parameters:**
  - `title` - Title of the books.
- **Responses:**
  - `200 OK`: Books with the specified title.
  - `403 Forbidden`: No books found with the specified title.

#### **Get Book Review**
- **URL:** `/review/:isbn`
- **Method:** `GET`
- **Description:** Retrieves reviews for a book based on its ISBN.
- **Parameters:**
  - `isbn` - ISBN of the book.
- **Responses:**
  - `200 OK`: Book reviews.
  - `403 Forbidden`: No reviews found for the book with the given ISBN.

---

### Authenticated Endpoints
These endpoints require a user to be authenticated.

---

#### **Login**
- **URL:** `/customer/login`
- **Method:** `POST`
- **Description:** Logs a user in, generating an access token.
- **Request Body:**
    ```json
    {
        "username": "your_username",
        "password": "your_password"
    }
    ```
- **Responses:**
  - `200 OK`: User successfully logged in.
  - `404 Not Found`: Invalid credentials.

#### **Add/Update Book Review**
- **URL:** `/customer/auth/review/:isbn`
- **Method:** `PUT`
- **Description:** Adds or updates a review for a book.
- **Parameters:**
  - `isbn` - ISBN of the book.
- **Request Body:**
    ```json
    {
        "review": "This is a review of the book."
    }
    ```
- **Responses:**
  - `200 OK`: Review successfully added or updated.
  - `404 Not Found`: Book with the given ISBN not found.

#### **Delete Book Review**
- **URL:** `/customer/auth/review/:isbn`
- **Method:** `DELETE`
- **Description:** Deletes a user's review for a book based on its ISBN.
- **Parameters:**
  - `isbn` - ISBN of the book.
- **Responses:**
  - `200 OK`: Review successfully deleted.
  - `404 Not Found`: No review found or book not found.

---

## Middleware

#### **Authorization Middleware**
- Checks for a valid JWT token in the user's session for routes that require authentication.
- If the token is valid, the request proceeds. If not, a `403 Forbidden` response is returned.

## Data Model

### Books
Books are stored in a JSON-like structure in `booksdb.js`. Each book has:
- **author**: The author of the book.
- **title**: The title of the book.
- **reviews**: A dictionary of reviews, where the key is the username and the value is the review text.

## Example Book Object
```json
{
  "1": {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {
      "user1": "Great book!",
      "user2": "Enjoyed it a lot."
    }
  }
}
