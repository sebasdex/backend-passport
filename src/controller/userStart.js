import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

dotenv.config();

const prisma = new PrismaClient();

export const userStart = async () => {
    const userExist = await prisma.users.findFirst();
    if (!userExist) {
        const newEmployee = await prisma.employees.create({
            data: {
                employeeNumber: "PRUEBA001",
                area: "Area de prueba",
                name: "Administrador",
                firstName: "admin",
                lastName: "admin",
                email: "admin@testing.com",
            },
        });
        const hashedPassword = await bcrypt.hash("12345678", 10);
        await prisma.users.create({
            data: {
                email: "admin@testing.com",
                password: hashedPassword,
                role: "administrador",
                employee: {
                    connect: {
                        id: newEmployee.id,
                    },
                },
            },
        });
        console.log("Usuario creado con éxito");
    } else {
        console.log("Usuario ya existe");
    }
}

