import asyncHandler from "express-async-handler";
import TableLoad from "../models/tableLoadModel.js";

// @desc     POST data array
// @route    POST /api/table
// @access   Public
const tableLoadPostData = asyncHandler(async (req, res) => {
    const data = req.body
    console.log(req.user._id, 'id')
    const dataTable = await TableLoad.create({
        data,
        user: req.user._id
    })

    if (dataTable) {
        res.status(201).json({
            success: true
        })
    } else {
        res.status(401).json({
            error: 'Invalid process post data'
        })
    }
})

// @desc     get data with array table load
// @route    GET /api/table
// @access   Public
const tableLoadGetData = asyncHandler(async (req, res) => {
    const dataTable = await TableLoad.find({})

    if (dataTable) {
        res.status(201).json({
            dataTable
        })
    } else {
        res.status(401).json({
            error: 'Invalid process get data'
        })
    }
})

export {
    tableLoadPostData,
    tableLoadGetData
}