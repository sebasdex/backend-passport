import { login, logout } from '../controller/authController.js';
import { Router } from 'express';

const router = Router();

router.post('/api/login', login);
router.post('/api/logout', logout);

router.get('/api/checkSession', (req, res) => {
    if (req.session.user) {
        res.json({ isAuthenticated: true, user: req.session.user });
    } else {
        res.json({ isAuthenticated: false });
    }
});


export default router;