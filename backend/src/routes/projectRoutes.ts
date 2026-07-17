import { Router } from 'express';
import { body } from 'express-validator';
import { getProjects, getProjectBySlug, createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';

const router = Router();

const projectValidationRules = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required'),
  body('slug')
    .trim()
    .notEmpty().withMessage('Slug is required')
    .matches(/^[a-z0-9-]+$/).withMessage('Slug must consist of lowercase alphanumeric characters and hyphens only'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required'),
  body('liveUrl')
    .optional({ checkFalsy: true })
    .isURL().withMessage('Live URL must be a valid URL'),
  body('githubUrl')
    .optional({ checkFalsy: true })
    .isURL().withMessage('GitHub URL must be a valid URL'),
  body('status')
    .optional()
    .isIn(['Published', 'Draft']).withMessage('Status must be either Published or Draft')
];

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', requireAuth, projectValidationRules, handleValidationErrors, createProject);
router.put('/:id', requireAuth, projectValidationRules, handleValidationErrors, updateProject);
router.delete('/:id', requireAuth, deleteProject);

export default router;
