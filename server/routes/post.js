import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/post.js';

import auth from '../middleware/auth.js';
// no matter if user is login or not, user can see the post
// but to create a post, user has to login in to get an id to create a post
const router = express.Router();

//Add routes

// localhost:5000/ - will not reach
// localhost:5000/posts - will reach as we added a prefix in index.js
// no logic in router, add logic in controller
router.get('/', getPosts);
router.post('/', auth, createPost);

//updatePost and deletePost is managed by the frontend - user won't not be able to click it
//patch is use to update existing document
// add auth - user can only update post that created by him.
router.patch('/:id', auth, updatePost)
// we need to know the id first in order to update existing post

// add auth - user can only delete post that he created. Cannot delete other post that wasn't created by him.
router.delete('/:id', auth, deletePost);

//likepost is managed by the backend
//add auth - user cannot like a post more than once for that specific user id
router.patch('/:id/likePost', auth, likePost)


export default router;