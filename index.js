import express from "express";
import employeeRoutes from "./src/routes/employees/employee.js";
import courseRoutes from "./src/routes/courses/course.js";

const app = express();
const port = 3000;
app.use(express.json());

app.use(employeeRoutes);
app.use(courseRoutes);

app.listen(port, () => {
    console.log("Server is running on port 3000");
});