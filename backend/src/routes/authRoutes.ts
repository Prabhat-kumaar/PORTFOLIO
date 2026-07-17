import { Router } from 'express';
import { login } from '../controllers/authController.js';

const router = Router();

// Base health check for authentication endpoints
router.get('/', (req, res) => {
  res.json({ message: 'Auth endpoint is ready.' });
});

router.post('/login', login);

export default router;
