import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    if (!req.user || (req.user.role !== 'administrador' && req.user.role !== 'empleado')) {
        return res.status(401).json({ message: 'No tienes permisos para acceder a esta ruta' });
    }
    res.status(200).json({ message: 'Bienvenido a la API de la empresa' });

});

export default router;