import { Router } from 'express';
import { body } from 'express-validator';
import { createContact, getContacts } from '../controllers/contactController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';

const router = Router();

const contactValidationRules = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required'),
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required'),
  body('email')
    .trim()
    .isEmail().withMessage('Please provide a valid email address'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ max: 2000 }).withMessage('Message must not exceed 2000 characters')
    .custom((value) => {
      if (/[<>]/.test(value)) {
        throw new Error('HTML tags are not allowed in the message');
      }
      return true;
    })
];

router.post('/', contactValidationRules, handleValidationErrors, createContact);
router.get('/', requireAuth, getContacts);

export default router;
