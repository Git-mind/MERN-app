import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/post.js';
const router = express.Router();

//Add routes

// localhost:5000/ - will not reach
// localhost:5000/posts - will reach as we added a prefix in index.js
// no logic in router, add logic in controller
router.get('/', getPosts);
router.post('/', createPost);

//patch is use to update existing document
router.patch('/:id', updatePost)
// we need to know the id first in order to update existing post

router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost)


export default router;