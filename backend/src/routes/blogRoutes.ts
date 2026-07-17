import { Router } from 'express';
import { body } from 'express-validator';
import { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';

const router = Router();

const blogValidationRules = [
  body('title')
    .isString().withMessage('Title must be a string')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title must not exceed 200 characters'),
  body('slug')
    .isString().withMessage('Slug must be a string')
    .trim()
    .notEmpty().withMessage('Slug is required')
    .matches(/^[a-z0-9-]+$/).withMessage('Slug must consist of lowercase alphanumeric characters and hyphens only'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required'),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required'),
  body('status')
    .isIn(['Published', 'Draft']).withMessage('Status must be either Published or Draft')
];

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', requireAuth, blogValidationRules, handleValidationErrors, createBlog);
router.put('/:id', requireAuth, blogValidationRules, handleValidationErrors, updateBlog);
router.delete('/:id', requireAuth, deleteBlog);

export default router;
