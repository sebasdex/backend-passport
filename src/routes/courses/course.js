import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.post("/api/addCourse", async (req, res) => {
    const { courseName, approved, place, description, instructor, startDate, endDate, studentId } = req.body;
    console.log(studentId)
    if (!studentId || isNaN(studentId)) {
        return res.status(400).json({ message: "El campo studentId debe ser un número válido" });
    }

    // Verificación de otros campos
    if (!courseName || approved === undefined || !place || !description || !instructor || !startDate) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }


    const dateISOStart = new Date(startDate).toISOString();
    const dateISOEnd = endDate ? new Date(endDate).toISOString() : null;
    const course = {
        courseName,
        approved,
        place,
        description,
        instructor,
        startDate: dateISOStart,
        endDate: dateISOEnd,
        student: {
            connect: { id: Number(studentId) },
        }
    };
    try {

        const newCourse = await prisma.courses.create({
            data: course,
        });
        res.status(201).json({ message: "Course added successfully", course: newCourse });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

router.get("/api/getCourse", async (_, res) => {
    try {
        const courses = await prisma.courses.findMany(
            {
                include: {
                    student: {
                        select: {
                            name: true,
                            firstName: true,
                            lastName: true,
                        }
                    }
                },
            }
        );
        res.status(200).json({ message: "Courses found", courses });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

router.get("/api/getCourse/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const course = await prisma.courses.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                student: {
                    select: {
                        name: true,
                        firstName: true,
                        lastName: true,
                    }
                }
            },
        });
        res.status(200).json({ message: "Course found", course });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

router.put("/api/updateCourse/:id", async (req, res) => {
    const { id } = req.params;
    const { courseName, approved, place, description, instructor, startDate, endDate, studentId } = req.body;
    const dateISOStart = new Date(startDate).toISOString();
    const dateISOEnd = endDate ? new Date(endDate).toISOString() : null;
    const course = {
        courseName,
        approved,
        place,
        description,
        instructor,
        startDate: dateISOStart,
        endDate: dateISOEnd,
        student: {
            connect: { id: studentId }
        }
    };
    try {
        if (!courseName || approved === undefined || !place || !description || !instructor || !startDate || !studentId
        ) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }
        const updatedCourse = await prisma.courses.update({
            where: {
                id: Number(id),
            },
            data: course,
        });
        res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }

});

router.delete("/api/deleteCourse/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCourse = await prisma.courses.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json({ message: "Course deleted successfully", course: deletedCourse });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

export default router;