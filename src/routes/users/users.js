import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.post("/api/addUser", async (req, res) => {
    const { email, password, role, employeeId } = req.body;
    try {
        if (!email || !password || !role || !employeeId) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }
        const userExists = await prisma.users.findUnique({
            where: {
                email,
            },
        });
        if (userExists) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }
        const newUser = await prisma.users.create({
            data: {
                email,
                password,
                role,
                employee: {
                    connect: {
                        id: Number(employeeId),
                    },
                },
            },
        });
        return res.status(201).json({ message: "Usuario agregado exitosamente", user: newUser });

    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ message: "Ocurrió un error en el servidor" });
    }

});

router.get("/api/getUsers", async (_, res) => {
    try {
        const users = await prisma.users.findMany(
            {
                orderBy: {
                    id: "desc",
                },
            }
        );
        return res.status(200).json({ message: "Usuarios encontrados", users });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ message: "Ocurrió un error en el servidor" });
    }
});

router.get("/api/getUser/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: Number(id),
            },
        });
        return res.status(200).json({ message: "Usuario encontrado", user });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ message: "Ocurrió un error en el servidor" });
    }
});

router.put("/api/updateUser/:id", async (req, res) => {
    const { id } = req.params;
    const { email, password, role, employeeId } = req.body;
    try {
        if (!email || !password || !role || !employeeId) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }
        const updatedUser = await prisma.users.update({
            where: {
                id: Number(id),
            },
            data: {
                email,
                password,
                role,
                employee: {
                    connect: {
                        id: Number(employeeId),
                    },
                },
            },
        });
        return res.status(200).json({ message: "Usuario actualizado", updatedUser });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ message: "Ocurrió un error en el servidor" });
    }
});

router.delete("/api/deleteUser/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await prisma.users.delete({
            where: {
                id: Number(id),
            },
        });
        return res.status(200).json({ message: "Usuario eliminado", deletedUser });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ message: "Ocurrió un error en el servidor" });
    }
});

export default router;