import express from "express";
import {
    currentTableLoadData,
    tableLoadDeleteData,
    tableLoadGetData,
    tableLoadPostData
} from "../controllers/tableLoadControllers.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router()

router.route('/')
    .post(protect, tableLoadPostData)
    .get(protect, tableLoadGetData)
router.route('/:id')
    .delete(protect, tableLoadDeleteData)
    .get(protect, currentTableLoadData)

export default router