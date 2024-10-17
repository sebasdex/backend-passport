import { Router } from "express";
const router = Router();

router.post("/api/addCourse", (req, res) => {
    res.send("Add Course");
});

router.get("/api/getCourse", (req, res) => {
    res.send("Get Course");
});

router.put("/api/updateCourse", (req, res) => {
    res.send("Update Course");
});

router.delete("/api/deleteCourse", (req, res) => {
    res.send("Delete Course");
});

export default router;