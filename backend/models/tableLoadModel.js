import mongoose from "mongoose";

const tableLoadSchema = mongoose.Schema({
        data: {type: Array},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)
const TableLoad = mongoose.model('TableLoad', tableLoadSchema)

export default TableLoad