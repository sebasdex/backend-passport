import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.post("/api/addCourse", async (req, res) => {
    const { courseName, approved, place, description, instructor, startDate, endDate, studentId } = req.body;
    const dateISOStart = new Date(startDate).toISOString();
    const dateISOEnd = new Date(endDate).toISOString();
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
        if (!courseName || !approved || !place || !description || !instructor || !startDate || !endDate || !studentId
        ) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }
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
        const courses = await prisma.courses.findMany();
        res.status(200).json({ message: "Courses found", courses });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

router.put("/api/updateCourse/:id", async (req, res) => {
    const { id } = req.params;
    const { courseName, approved, place, description, instructor, startDate, endDate, studentId } = req.body;
    const dateISOStart = new Date(startDate).toISOString();
    const dateISOEnd = new Date(endDate).toISOString();
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
        if (!courseName || approved === undefined || !place || !description || !instructor || !startDate || !endDate || !studentId
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