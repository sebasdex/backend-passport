import { login, logout } from '../controller/authController.js';
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const Prisma = new PrismaClient();
const router = Router();

router.post('/api/login', login);
router.post('/api/logout', logout);

router.get('/api/checkSession', async (req, res) => {
    if (req.session.user) {
        try {
            const userExist = await Prisma.users.findUnique({
                where: {
                    id: req.session.user.id,
                },
            });
            if (!userExist) {
                req.session.destroy((err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Error al cerrar sesión' });
                    }
                    res.json({ isAuthenticated: false });
                });
            } else {
                res.json({ isAuthenticated: true, user: req.session.user });
            }
        } catch (error) {
            console.log('Error al verificar sesión:', error);
            res.status(500).json({ isAuthenticated: false });
        }
    } else {
        res.json({ isAuthenticated: false });
    }
});


export default router;