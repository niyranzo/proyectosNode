import express from 'express';
import { login, logout, register } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// rutas de autenticacion
// /login, register, logout

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

// aqui tengo q añadir las rutas que falta (logear con google)
router.get("/check-auth", authMiddleware, (req, res) => {
    res.status(200).json({ messaje: "Autenticado", userId: req.userId });
})
export default router;
