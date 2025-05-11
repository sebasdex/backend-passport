import bcrypt from 'bcryptjs';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const searchUser = await prisma.users.findUnique({
            where: {
                email,
            },
        });
        if (!searchUser) {
            return res.status(400).json({ message: 'User not found' });
        }
        bcrypt.compare(password, searchUser.password, function (err, isMatch) {
            if (err) {
                return res.status(500).json({ message: 'Server Error' });
            }
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid Credentials' });
            }
            req.session.user = { id: searchUser.id, email: searchUser.email, role: searchUser.role, employeeId: searchUser.employeeId };
            req.session.save((err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al guardar sesión' });
                }
                res.json({ message: 'Login Successful', user: searchUser });
            });
        });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

function logout(req, res) {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar sesión' });
        }
        res.status(200).json({ message: 'Sesión cerrada correctamente' });
    });
}



export {
    login,
    logout
}