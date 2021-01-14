import express from "express";
import {tableLoadGetData, tableLoadPostData} from "../controllers/tableLoadControllers.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router()

router.route('/')
    .post(protect, tableLoadPostData)
    .get(tableLoadGetData)

export default router