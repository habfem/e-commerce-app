import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js'
//import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router