import express from 'express';
import { addUser, getUserProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// rutas de usuarios
// addUser, 

router.post('/', addUser);
router.get('/me', authMiddleware, getUserProfile);


export default router;
