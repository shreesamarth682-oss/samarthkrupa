import express from "express";
import { getInquiries, addInquiry ,deleteInquiry} from "../controllers/inquiryController.js";

const router = express.Router();

router.get("/", getInquiries);
router.post("/", addInquiry);
router.delete("/:id", deleteInquiry);

export default router;
