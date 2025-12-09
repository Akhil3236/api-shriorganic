
import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: "User"
    },
    message: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        max: 5,
        min: 1
    },
    product: {
        type: String,
        ref: "Product"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: String,
        ref: "User"
    }]
})

export default mongoose.model("Review", reviewSchema)