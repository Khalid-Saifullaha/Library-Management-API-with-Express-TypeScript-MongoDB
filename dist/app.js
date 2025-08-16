"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./app/controllers/book.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const app = (0, express_1.default)();
// Routes
app.use("/api/books", book_controller_1.bookRoutes);
app.use("/api/borrow", borrow_controller_1.borrowRoutes);
// Root route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Library Management System API is live!",
        endpoints: {
            books: {
                "POST /api/books": "Create a new book",
                "GET /api/books": "Get all books with filtering and sorting",
                "GET /api/books/:bookId": "Get book by ID",
                "PUT /api/books/:bookId": "Update book by ID",
                "DELETE /api/books/:bookId": "Delete book by ID",
            },
            borrow: {
                "POST /api/borrow": "Borrow a book",
                "GET /api/borrow": "Get borrowed books summary",
            },
        },
    });
});
// 404 route
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
        success: false,
        error: `Cannot ${req.method} ${req.originalUrl}`,
    });
});
// Global error handler
app.use((error, req, res, next) => {
    res.status(500).json({
        message: "Internal server error",
        success: false,
        error: error.message,
    });
});
exports.default = app;
