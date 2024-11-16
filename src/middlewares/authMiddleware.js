import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function isAuth(req, res, next) {
    if (req.session.user) {
        try {
            // Verifica si el usuario sigue existiendo en la base de datos
            const user = await prisma.users.findUnique({
                where: { id: req.session.user.id },
            });

            // Si el usuario no existe, destruye la sesión
            if (!user) {
                req.session.destroy((err) => {
                    if (err) {
                        console.error('Error al destruir la sesión:', err);
                    }
                    return res.status(401).json({ message: 'Usuario eliminado. Sesión expirada.' });
                });
            } else {
                // Si el usuario existe, continúa con la solicitud
                return next();
            }
        } catch (error) {
            console.error('Error al verificar el usuario:', error);
            return res.status(500).json({ message: 'Error en el servidor.' });
        }
    } else {
        return res.status(401).json({ message: 'No autenticado.' });
    }
}

export default isAuth;