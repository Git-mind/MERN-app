import express from 'express';
import { signin, signup } from '../controllers/user.js';
const router = express.Router();

// why is this a post route? Because you sending formData to the backend
router.post('/signin', signin);
router.post('/signup', signup);


export default router;