import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    tittle: {
        type: String,
    },
    message: {
        type: String,
    },
    creator: {
        type: String,
    },
    tags: [{
        type: String
    }],
    selectedFile: {
        type: String,
    },
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date(Date.now())
    }
})

export default mongoose.model('PostMessage', postSchema);