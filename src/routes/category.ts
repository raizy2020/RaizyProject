// import express from 'express';
// import { getAllCategories, getCategoryById, createCategory, updateCategory } from '../controllers/Category';

// const router = express.Router();

// router.get('/', getAllCategories);
// router.get('/:id', getCategoryById);
// router.post('/', createCategory);
// router.put('/:id', updateCategory);

// export default router;
import { Router, Request, Response } from 'express';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/Category';

const router = Router();

router.get('/', getAllCategories);
router.post('/', createCategory);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;