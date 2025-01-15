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
                employeeNumber: "EMP001",
                area: "Marketing",
                name: "Ana",
                firstName: "Ross",
                lastName: "Perot",
                email: "anab4n4n@mymail.com",
            },
        });
        const hashedPassword = await bcrypt.hash("12345678", 10);
        await prisma.users.create({
            data: {
                email: "anab4n4n@mymail.com",
                password: hashedPassword,
                role: process.env.ROLE_ONE,
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

