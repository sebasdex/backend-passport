import { Router } from "express";
const router = Router();

router.post("/api/addDepartment", (req, res) => {
    res.send("Add Department");
});

router.get("/api/getDepartment", (req, res) => {
    res.send("Get Department");
});

router.put("/api/updateDepartment", (req, res) => {
    res.send("Update Department");
});

router.delete("/api/deleteDepartment", (req, res) => {
    res.send("Delete Department");
});

export default router;