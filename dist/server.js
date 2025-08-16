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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
let server;
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI ||
    "mongodb+srv://library-management:9bAYRc9FM0NIiCrL@cluster0.erstx.mongodb.net/advance-note-app?retryWrites=true&w=majority&appName=Cluster0";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB
            yield mongoose_1.default.connect(MONGODB_URI);
            console.log(" Connected to MongoDB successfully!");
            // Start server
            server = app_1.default.listen(PORT, () => {
                console.log(` Library Management API is running on port ${PORT}`);
                console.log(` Access the API at: http://localhost:${PORT}`);
                console.log(` API Documentation: http://localhost:${PORT}`);
            });
        }
        catch (error) {
            console.error("❌ Failed to start server:", error);
            process.exit(1);
        }
    });
}
// Handle graceful shutdown
process.on("SIGTERM", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("SIGTERM received");
    if (server) {
        server.close(() => {
            console.log("HTTP server closed");
            mongoose_1.default.connection.close().then(() => {
                console.log("MongoDB connection closed");
                process.exit(0);
            });
        });
    }
}));
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("SIGINT received");
    if (server) {
        server.close(() => {
            console.log("HTTP server closed");
            mongoose_1.default.connection.close().then(() => {
                console.log("MongoDB connection closed");
                process.exit(0);
            });
        });
    }
}));
// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
main();
