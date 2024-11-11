import { login, logout } from '../controller/authController.js';
import { Router } from 'express';
import isAuth from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/api/login', login);
router.post('/api/logout', isAuth, logout);

router.get('/api/checkSession', isAuth, (req, res) => {
    res.json({ user: req.user });
});


export default router;