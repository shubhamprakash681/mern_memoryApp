import ErrorHandler from "../utils/ErrorHandler.js"
import { StatusCodes } from "http-status-codes"

import PostMessage from "../models/PostMessage.js"
import mongoose from "mongoose";

// note:- next is a callback function, used to call a middleware
// try catch block is added to handle async errors

export const createPost = async (req, res, next) => {
    try {
        const { tittle, message, selectedFile, creator, tags } = req.body;
        const newPost = await PostMessage.create({ tittle, message, selectedFile, creator, tags })
        
        res.status(StatusCodes.CREATED).json({
            success: true,
            newPost: newPost
        })
    }catch(err) {
        return next(new ErrorHandler(err.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

export const getPosts = async (req, res, next) => {
    try {
        const allPosts = await PostMessage.find()
        
        
        res.status(StatusCodes.OK).json({
            success: true,
            allPosts: allPosts,
            
        })
        
    }catch(err) {
        return next(new ErrorHandler(err.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}
export const getPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const currentPost = await PostMessage.findById(id);
        
        res.status(StatusCodes.OK).json({
            success: true,
            currentPost: currentPost
        })
    }catch(errr) {
        return next(new ErrorHandler(errr.message, StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

export const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { tittle, message, selectedFile, creator, tags } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(StatusCodes.BAD_REQUEST)
                    .json({
                        success:false,
                        message: `No post with id: ${id}`
                    })
                    .send(`No post with id: ${id}`);
        }

        const updatedPost = { creator, tittle, message, tags, selectedFile, _id: id }
        await PostMessage.findByIdAndUpdate(id, updatedPost, {new: true})
        res.status(StatusCodes.OK).json({
            success: true,
            updatedPost: updatedPost
        })
        
    }catch(err) {
        return next(new ErrorHandler(err.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

export const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(StatusCodes.BAD_REQUEST)
                    .json({
                        success:false,
                        message: `No post with id: ${id}`
                    })
                    .send(`No post with id: ${id}`);
                }
                
                await PostMessage.findByIdAndRemove(id);
                
                res.status(StatusCodes.OK).json({ 
                    success: true,
                    message: "Post deleted successfully." 
                });
    }catch(err) {
        return next(new ErrorHandler(err.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }
}
        
export const likePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(StatusCodes.BAD_REQUEST)
                    .json({
                        success:false,
                        message: `No post with id: ${id}`
                    })
                    .send(`No post with id: ${id}`);
        }

        const currentPost = await PostMessage.findById(id);
        if (!currentPost) {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: `No post with id: ${id}`
            })
            .send(`No post with id: ${id}`);
        }
        const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: currentPost.likeCount + 1 }, {new:true})
        res.status(StatusCodes.OK).json({
            success: true,
            updatedPost: updatedPost
        })

    }catch(err) {
        return next(new ErrorHandler(err.message, StatusCodes.INTERNAL_SERVER_ERROR))
    }

}