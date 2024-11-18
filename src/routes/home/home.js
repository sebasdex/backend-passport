import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    if (!req.user || (req.user.role !== process.env.ROLE_ONE && req.user.role !== process.env.ROLE_TWO)) {
        return res.status(401).json({ message: 'No tienes permisos para acceder a esta ruta' });
    }
    res.status(200).json({ message: 'Bienvenido a la API de la empresa' });

});

export default router;