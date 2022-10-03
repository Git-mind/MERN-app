import express from 'express';
import { getPosts, createPost } from '../controllers/post.js';
const router = express.Router();

//Add routes

// localhost:5000/ - will not reach
// localhost:5000/posts - will reach as we added a prefix in index.js
// no logic in router, add logic in controller
router.get('/', getPosts);
router.post('/', createPost);

export default router;