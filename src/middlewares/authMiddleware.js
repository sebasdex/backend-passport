import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function isAuth(req, res, next) {
    if (!req.session || !req.session.user?.id) {
        return res.status(401).json({ message: 'No estás autenticado. Por favor, inicia sesión' });
    }
    try {
        const userExist = await prisma.users.findUnique({
            where: {
                id: req.session.user.id,
            },
        });
        if (!userExist) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }
        req.user = userExist;
        next();

    } catch (error) {
        console.error('Error al verificar usuario:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export default isAuth;