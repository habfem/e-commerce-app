import express from 'express';
import { authUser, getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile) //// protect middleware will run when this route is hit

export default router