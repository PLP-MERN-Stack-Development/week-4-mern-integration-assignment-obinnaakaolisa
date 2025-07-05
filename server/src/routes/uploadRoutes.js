import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Upload single image
router.post('/', protect, upload.single('image'), (req, res) => {
  res.status(200).json({ imageUrl: `/src/uploads/${req.file.filename}` });
});

export default router;
