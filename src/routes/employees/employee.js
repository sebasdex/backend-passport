import { Router } from "express";
const router = Router();

router.post("/api/addEmployee", (req, res) => {
    res.send("Register");
});

router.get("/api/getEmployee", (req, res) => {
    res.send("Get Employee");
});

router.put("/api/updateEmployee", (req, res) => {
    res.send("Update Employee");
});

router.delete("/api/deleteEmployee", (req, res) => {
    res.send("Delete Employee");
});

export default router;