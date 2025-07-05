import express from 'express';
import { 
    getAllCategories, 
    createCategory, 
    updateCategory, 
    deleteCategory, 
    getCategoryById, 
    getCategoryByName 
} from '../controllers/categoryController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { categoryValidationRules } from '../middlewares/categoryValidators.js';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', protect, categoryValidationRules(), validateRequest, createCategory);
router.put('/:id', protect, categoryValidationRules(), validateRequest, updateCategory);
router.delete('/:id', protect, deleteCategory);
router.get('/name/:name', getCategoryByName);
router.get('/:id', getCategoryById);

export default router;
