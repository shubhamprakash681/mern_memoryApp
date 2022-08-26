import express from 'express'
import { createPost, deletePost, getPost, getPosts, likePost, updatePost } from '../controllers/postsControllers.js';

const postsRouter = express.Router()

postsRouter.route('/posts').get(getPosts).post(createPost)
postsRouter.route('/posts/:id').get(getPost).patch(updatePost).delete(deletePost)
postsRouter.route('/posts/:id/likePost').patch(likePost)


export default postsRouter;