import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://library-management:9bAYRc9FM0NIiCrL@cluster0.erstx.mongodb.net/advance-note-app?retryWrites=true&w=majority&appName=Cluster0";

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log(" Connected to MongoDB successfully!");

    // Start server
    server = app.listen(PORT, () => {
      console.log(` Library Management API is running on port ${PORT}`);
      console.log(` Access the API at: http://localhost:${PORT}`);
      console.log(` API Documentation: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received");
  if (server) {
    server.close(() => {
      console.log("HTTP server closed");
      mongoose.connection.close().then(() => {
        console.log("MongoDB connection closed");
        process.exit(0);
      });
    });
  }
});

process.on("SIGINT", async () => {
  console.log("SIGINT received");
  if (server) {
    server.close(() => {
      console.log("HTTP server closed");
      mongoose.connection.close().then(() => {
        console.log("MongoDB connection closed");
        process.exit(0);
      });
    });
  }
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: any) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

main();
