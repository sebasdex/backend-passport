import express from "express";
import session from "express-session";
import employeeRoutes from "./src/routes/employees/employee.js";
import courseRoutes from "./src/routes/courses/course.js";
import userRoutes from "./src/routes/users/users.js";
import authRoutes from "./src/routes/auth.js";
import cors from "cors";
import isAuth from "./src/middlewares/authMiddleware.js";


const app = express();
const port = 3000;
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))
app.use(cors(corsOptions));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/employees', isAuth, employeeRoutes);
app.use('/courses', isAuth, courseRoutes);
app.use('/users', isAuth, userRoutes);


app.listen(port, () => {
    console.log("Server is running on port 3000");
});