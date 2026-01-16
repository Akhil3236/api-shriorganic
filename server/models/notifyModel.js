import mongoose from "mongoose";

// Schema for the subscribe to offer newsletter

const notifySchema = new mongoose.Schema({
    _id: Number,
    email: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: String,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Generate a 6-digit random number for the ID
notifySchema.pre('save', async function (next) {
    if (this.isNew && !this._id) {
        this._id = Math.floor(100000 + Math.random() * 900000);
    }
    next();
});

export default mongoose.model("Notify", notifySchema);



