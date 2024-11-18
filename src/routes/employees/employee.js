import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.post("/api/addEmployee", async (req, res) => {
    if (req.user.role !== process.env.ROLE_ONE) {
        return res.status(401).json({ message: 'No tienes permisos para acceder a esta ruta' });
    }
    const { employeeNumber, area, name, firstName, lastName, email } = req.body;
    try {
        if (!employeeNumber || !area || !name || !firstName || !lastName || !email) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }
        const newEmployee = await prisma.employees.create({
            data: {
                employeeNumber,
                area,
                name,
                firstName,
                lastName,
                email,
            },
        });
        return res.status(201).json({ message: "Empleado agregado exitosamente", employee: newEmployee });

    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ message: "Ocurrió un error en el servidor" });
    }

});

router.get("/api/getEmployees", async (req, res) => {
    try {
        const employees = await prisma.employees.findMany(
            {
                orderBy: {
                    id: "desc",
                },
            }
        );
        return res.status(200).json({ message: "Empleados encontrados", employees });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ message: "Ocurrió un error en el servidor" });
    }
});

router.get("/api/getEmployee/:id", async (req, res) => {
    if (req.user.role !== process.env.ROLE_ONE) {
        return res.status(401).json({ message: 'No tienes permisos para acceder a esta ruta' });
    }
    const { id } = req.params;
    try {
        const employee = await prisma.employees.findUnique({
            where: {
                id: Number(id),
            },
        });
        return res.status(200).json({ message: "Empleado encontrado", employee });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ message: "Ocurrió un error en el servidor" });
    }
});

router.put("/api/updateEmployee/:id", async (req, res) => {
    if (req.user.role !== process.env.ROLE_ONE) {
        return res.status(401).json({ message: 'No tienes permisos para acceder a esta ruta' });
    }
    const { id } = req.params;
    const { employeeNumber, area, name, firstName, lastName, email } = req.body;
    try {
        if (!employeeNumber || !area || !name || !firstName || !lastName || !email) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }
        const updatedEmployee = await prisma.employees.update({
            where: {
                id: Number(id),
            },
            data: {
                employeeNumber,
                area,
                name,
                firstName,
                lastName,
                email,
            },
        });
        return res.status(200).json({ message: "Empleado actualizado exitosamente", employee: updatedEmployee });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ message: "Ocurrió un error en el servidor" });
    }
});

router.delete("/api/deleteEmployee/:id", async (req, res) => {
    if (req.user.role !== process.env.ROLE_ONE) {
        return res.status(401).json({ message: 'No tienes permisos para acceder a esta ruta' });
    }
    const { id } = req.params;
    try {
        const deletedEmployee = await prisma.employees.delete({
            where: {
                id: Number(id),
            },
        });
        return res.status(200).json({ message: "Empleado eliminado exitosamente", employee: deletedEmployee });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ message: "Ocurrió un error en el servidor" });
    }
});

export default router;