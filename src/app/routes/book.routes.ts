import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/book.controller";

const router = Router();

router.post("/books", createBook);
router.get("/books", getAllBooks);
router.get("/books/:bookId", getBookById);
router.put("/books/:bookId", updateBook);
router.delete("/books/:bookId", deleteBook);

export default router;
