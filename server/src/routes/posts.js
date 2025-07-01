import express from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from '../controllers/postController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { postValidationRules } from '../middlewares/postValidators.js';

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', protect, postValidationRules(), validateRequest, createPost);
router.get('/:id', getPostById);
router.put('/:id', protect, postValidationRules(), validateRequest, updatePost);
router.delete('/:id', protect, postValidationRules(), validateRequest, deletePost);

export default router;
