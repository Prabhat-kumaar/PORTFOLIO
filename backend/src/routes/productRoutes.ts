import { Router } from 'express';
import { body } from 'express-validator';
import { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';

const router = Router();

const productValidationRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required'),
  body('slug')
    .trim()
    .notEmpty().withMessage('Slug is required')
    .matches(/^[a-z0-9-]+$/).withMessage('Slug must consist of lowercase alphanumeric characters and hyphens only'),
  body('price')
    .trim()
    .notEmpty().withMessage('Price is required')
    .custom((value) => {
      const cleanPrice = value.replace(/[₹$]/g, '').trim();
      const num = parseFloat(cleanPrice);
      if (isNaN(num) || num <= 0) {
        throw new Error('Price must be a positive number');
      }
      return true;
    })
];

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);
router.post('/', requireAuth, productValidationRules, handleValidationErrors, createProduct);
router.put('/:id', requireAuth, productValidationRules, handleValidationErrors, updateProduct);
router.delete('/:id', requireAuth, deleteProduct);

export default router;
