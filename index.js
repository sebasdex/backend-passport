import express from "express";
import employeeRoutes from "./src/routes/employees/employee.js";
import courseRoutes from "./src/routes/courses/course.js";
import userRoutes from "./src/routes/users/users.js";
import cors from "cors";

const app = express();
const port = 3000;
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(employeeRoutes);
app.use(courseRoutes);
app.use(userRoutes);

app.listen(port, () => {
    console.log("Server is running on port 3000");
});