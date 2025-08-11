import { Router } from "express";
import {
  borrowBook,
  borrowedBooksSummary,
} from "../controllers/borrow.controller";

const router = Router();

router.post("/borrow", borrowBook);
router.get("/borrow", borrowedBooksSummary);

export default router;
