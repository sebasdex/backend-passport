import express from "express";
import employeeRoutes from "./src/routes/employees/employee.js";
import courseRoutes from "./src/routes/courses/course.js";
import departmentRoutes from "./src/routes/deparments/department.js";

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(employeeRoutes);
app.use(courseRoutes);
app.use(departmentRoutes);
app.get("/api/login", (req, res) => {
    res.send("Login");
});

app.listen(port, () => {
    console.log("Server is running on port 3000");
});