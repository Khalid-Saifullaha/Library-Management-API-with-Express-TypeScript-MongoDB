# Library Management System API

A complete Library Management API built with **Express, TypeScript, and MongoDB (Mongoose)**.  
This system allows managing books and borrowing records with proper validation, business logic, and aggregation.

---

## 🎯 Objective

Develop a Library Management System using Express, TypeScript, and MongoDB with the following requirements:

- Proper schema validation
- Business logic enforcement (e.g., availability control on borrow)
- Use of MongoDB aggregation pipeline
- At least one Mongoose static or instance method
- Use of Mongoose middleware (pre, post)
- Filtering and sorting features

---

## 🔧 Core Requirements

- Use Express and TypeScript
- Connect to MongoDB using Mongoose
- Follow exact API endpoints and response structures

---

## 📌 Book Model Fields

| Field       | Type    | Required | Notes                                                      |
| ----------- | ------- | -------- | ---------------------------------------------------------- |
| title       | string  | Yes      | Book’s title                                               |
| author      | string  | Yes      | Book’s author                                              |
| genre       | string  | Yes      | FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY |
| isbn        | string  | Yes      | Unique book ISBN                                           |
| description | string  | No       | Optional summary                                           |
| copies      | number  | Yes      | Non-negative integer                                       |
| available   | boolean | No       | Defaults to true                                           |

---

## 📌 Borrow Model Fields

| Field    | Type     | Required | Notes             |
| -------- | -------- | -------- | ----------------- |
| book     | ObjectId | Yes      | Reference to book |
| quantity | number   | Yes      | Positive integer  |
| dueDate  | Date     | Yes      | Return date       |

---

## ⚠ Generic Error Response Example

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

✨ Main API Endpoints

1. Create Book

```json
POST /api/books
```

Request:

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

Response:

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

2. Get All Books

```json
GET /api/books
```

Supports filtering and sorting:

Example Query:

```json
 /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```

Response:

```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
  ]
}
```

3. Get Book by ID

```json
GET /api/books/:bookId
```

Response:

```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

4. Update Book

```json
PUT /api/books/:bookId
```

Request:

```json
{
  "copies": 50
}
Response:

{
  "success": true,
  "message": "Book updated successfully",
  "data": { ... }
}
```

5. Delete Book

```json
DELETE /api/books/:bookId
```

Response:

```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

6. Borrow a Book

```json
POST /api/borrow
```

Business Logic:

Verify available copies

Deduct quantity and update availability

Save borrow record

Request:

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

Response:

```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": { ... }
}
```

7. Borrowed Books Summary

```json
GET /api/borrow
```

Purpose: Return total borrowed quantity per book using aggregation.

Response:

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

⚡ Pro Tips

```
Strictly follow API endpoint and response formats

Use meaningful variable names and clean code

Handle errors clearly (validation, 404s)

Provide a short video explaining key features and logic

Include setup instructions for running locally

```

## Deployment

To deploy this project run

npm run deploy

```

💻 Setup Instructions

```

# 1. Clone the repository

```

git clone https://github.com/Khalid-Saifullaha/Library-Management-API-with-Express-TypeScript-MongoDB.git

```

# 2. Install dependencies

```

npm install

```

# 3. Create .env file

```

MONGODB_URI=your_mongodb_connection_string
PORT=5000

```

# 4. Run the project

```

npm run dev

```

🌐 Optional Links
Live Deployment Link : https://library-management-ochre-ten.vercel.app/

📽️ Video Explanation Link : https://app.usebubbles.com/f5GH3pZGNm2E2f6B8ww4m8
