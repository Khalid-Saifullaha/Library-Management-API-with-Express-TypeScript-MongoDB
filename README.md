# 📚 Library Management API

A **Library Management System API** built with **Express.js, TypeScript, and MongoDB (Mongoose)**.  
This API allows you to manage books, handle borrow operations with business logic, and generate borrowed book summaries using aggregation pipelines.

---

## 🎯 Objective

The goal of this project is to build a robust backend system for library management that enforces:

- Proper schema validation
- Business logic (e.g., availability control on borrow)
- Aggregation pipelines for reporting
- Mongoose static or instance methods
- Mongoose middleware (pre/post hooks)
- Filtering and sorting features

---

## 🔧 Core Requirements

- **Backend:** Express.js with TypeScript
- **Database:** MongoDB using Mongoose ODM
- **Validation:** Schema-level validation and error handling
- **Business Logic:**
  - Borrowing allowed only if sufficient copies are available
  - Automatically mark books as unavailable when copies reach zero

---

## 📂 Project Structure

# Project Structure

📦 Project Structure

- src/
  - models/
    - book.model.ts
    - borrow.model.ts
  - routes/
    - book.routes.ts
    - borrow.routes.ts
  - controllers/
    - book.controller.ts
    - borrow.controller.ts
  - middlewares/
    - errorHandler.ts
  - utils/
    - ApiResponse.ts
  - server.ts

---

## ⚙️ Tech Stack

- **Node.js & Express.js**
- **TypeScript**
- **MongoDB (Mongoose)**
- **Deployment:** Vercel / Render / Localhost

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/library-management-system.git
cd library-management-system
2️⃣ Install dependencies

npm install
3️⃣ Setup environment variables
Create a .env file in the project root:

ini

MONGO_URI=mongodb+srv://<your-mongodb-uri>
PORT=5000
4️⃣ Run in development

npm run start:dev
5️⃣ Build & run in production

npm run build
npm run start:prod

📌 API Endpoints
1. Create Book
POST /api/books

Request:

{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
Response:

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
2. Get All Books (with filtering & sorting)
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5

Query Parameters:

filter – Filter by genre

sortBy – Field to sort (e.g., createdAt)

sort – asc or desc

limit – Number of results (default 10)

Response:

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

3. Get Book by ID
GET /api/books/:bookId

Response:

{
  "success": true,
  "message": "Book retrieved successfully",
  "data": { ... }
}
4. Update Book
PUT /api/books/:bookId

Request:

{
  "copies": 50
}
Response:

{
  "success": true,
  "message": "Book updated successfully",
  "data": { ... }
}
5. Delete Book
DELETE /api/books/:bookId

Response:

{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
6. Borrow a Book
POST /api/borrow

Business Logic:

Verify the book has enough available copies

Deduct the requested quantity from the book’s copies

If copies reach 0, update available to false

Save the borrow record

Request:

{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
Response:

{
  "success": true,
  "message": "Book borrowed successfully",
  "data": { ... }
}
7. Borrowed Books Summary (Aggregation)
GET /api/borrow

Response:

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
    }
  ]
}
❌ Error Handling Example

{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```
