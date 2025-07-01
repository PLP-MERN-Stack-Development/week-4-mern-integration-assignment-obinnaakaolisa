import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { registerValidationRules, loginValidationRules } from '../middlewares/authValidators.js';

const router = express.Router();

router.post('/register', registerValidationRules(), validateRequest, registerUser);
router.post('/login', loginValidationRules(), validateRequest, loginUser);

export default router;
