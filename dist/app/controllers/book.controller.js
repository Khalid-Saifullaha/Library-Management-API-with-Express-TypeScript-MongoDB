"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const book_model_1 = require("../models/book.model");
exports.bookRoutes = express_1.default.Router();
// Zod validation schema
const CreateBookSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    author: zod_1.z.string().min(1, "Author is required"),
    genre: zod_1.z.enum([
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
    ]),
    isbn: zod_1.z.string().min(1, "ISBN is required"),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number().int().min(0, "Copies must be a positive number"),
    available: zod_1.z.boolean().optional(),
});
const UpdateBookSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    author: zod_1.z.string().min(1).optional(),
    genre: zod_1.z
        .enum([
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
    ])
        .optional(),
    isbn: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number().int().min(0).optional(),
    available: zod_1.z.boolean().optional(),
});
// Create Book
exports.bookRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = CreateBookSchema.parse(req.body);
        const book = yield book_model_1.Book.create(validatedData);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        if (error.name === "ZodError") {
            res.status(400).json({
                message: "Validation failed",
                success: false,
                error: error.errors,
            });
            return;
        }
        if (error.code === 11000) {
            res.status(400).json({
                message: "ISBN already exists",
                success: false,
                error: error,
            });
            return;
        }
        res.status(400).json({
            message: "Failed to create book",
            success: false,
            error: error,
        });
    }
}));
// Get All Books with filtering and sorting
exports.bookRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit = 10, } = req.query;
        // Build query object
        let query = {};
        if (filter) {
            query.genre = filter;
        }
        // Build sort object
        const sortOrder = sort === "asc" ? 1 : -1;
        const sortObject = {};
        sortObject[sortBy] = sortOrder;
        const books = yield book_model_1.Book.find(query)
            .sort(sortObject)
            .limit(parseInt(limit));
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Failed to retrieve books",
            success: false,
            error: error,
        });
    }
}));
//  Get Book by ID
exports.bookRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.Book.findById(bookId);
        if (!book) {
            res.status(404).json({
                message: "Book not found",
                success: false,
                error: "No book found with the provided ID",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Failed to retrieve book",
            success: false,
            error: error,
        });
    }
}));
//  Update Book
exports.bookRoutes.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const validatedData = UpdateBookSchema.parse(req.body);
        const book = yield book_model_1.Book.findByIdAndUpdate(bookId, validatedData, {
            new: true,
            runValidators: true,
        });
        if (!book) {
            res.status(404).json({
                message: "Book not found",
                success: false,
                error: "No book found with the provided ID",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        if (error.name === "ZodError") {
            res.status(400).json({
                message: "Validation failed",
                success: false,
                error: error.errors,
            });
            return;
        }
        res.status(400).json({
            message: "Failed to update book",
            success: false,
            error: error,
        });
    }
}));
//  Delete Book
exports.bookRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.Book.findByIdAndDelete(bookId);
        if (!book) {
            res.status(404).json({
                message: "Book not found",
                success: false,
                error: "No book found with the provided ID",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Failed to delete book",
            success: false,
            error: error,
        });
    }
}));
