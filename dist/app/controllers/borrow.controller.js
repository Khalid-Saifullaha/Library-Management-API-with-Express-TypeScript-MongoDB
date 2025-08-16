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
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
exports.borrowRoutes = express_1.default.Router();
// Zod validation schema
const BorrowBookSchema = zod_1.z.object({
    book: zod_1.z.string().refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
        message: "Invalid book ID",
    }),
    quantity: zod_1.z.number().int().min(1, "Quantity must be at least 1"),
    dueDate: zod_1.z.string().refine((val) => {
        const date = new Date(val);
        return !isNaN(date.getTime()) && date > new Date();
    }, {
        message: "Due date must be a valid future date",
    }),
});
//  Borrow a Book
exports.borrowRoutes.route("/").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = BorrowBookSchema.parse(req.body);
        // Find BOok
        const book = yield book_model_1.Book.findById(validatedData.book);
        if (!book) {
            res.status(404).json({
                message: "Book not found",
                success: false,
                error: "No book found with the provided ID",
            });
            return;
        }
        // Check if enough copies available
        if (book.copies < validatedData.quantity) {
            res.status(400).json({
                message: "Insufficient copies available",
                success: false,
                error: `Only ${book.copies} copies available, but ${validatedData.quantity} requested`,
            });
            return;
        }
        // Create borrow record
        const borrowData = {
            book: new mongoose_1.default.Types.ObjectId(validatedData.book),
            quantity: validatedData.quantity,
            dueDate: new Date(validatedData.dueDate),
        };
        const borrowRecord = yield borrow_model_1.Borrow.create(borrowData);
        // Update book copies and availability
        book.copies -= validatedData.quantity;
        // Use static method to update availability
        yield book.save();
        yield book_model_1.Book.updateAvailability(book._id.toString());
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowRecord,
        });
        return;
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
            message: "Failed to borrow book",
            success: false,
            error: error,
        });
        return;
    }
}));
// Borrowed Books Summary
exports.borrowRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowedBooksSummary = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails",
                },
            },
            {
                $unwind: "$bookDetails",
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn",
                    },
                    totalQuantity: 1,
                },
            },
            {
                $sort: { totalQuantity: -1 },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrowedBooksSummary,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Failed to retrieve borrowed books summary",
            success: false,
            error: error,
        });
    }
}));
