"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book reference is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
        validate: {
            validator: function (value) {
                return Number.isInteger(value);
            },
            message: "Quantity must be a positive integer",
        },
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
        validate: {
            validator: function (value) {
                return value > new Date();
            },
            message: "Due date must be in the future",
        },
    },
}, {
    timestamps: true,
    versionKey: false,
});
// Pre middleware
borrowSchema.pre("save", function (next) {
    console.log(`Creating borrow record for ${this.quantity} copies of book ${this.book}`);
    next();
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
