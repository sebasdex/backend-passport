import express from "express";
import session from "express-session";
import employeeRoutes from "./src/routes/employees/employee.js";
import courseRoutes from "./src/routes/courses/course.js";
import userRoutes from "./src/routes/users/users.js";
import authRoutes from "./src/routes/auth.js";
import homeRoutes from "./src/routes/home/home.js";
import cors from "cors";
import isAuth from "./src/middlewares/authMiddleware.js";
import { userStart } from "./src/controller/userStart.js";
import RedisStore from "connect-redis";
import Redis from "ioredis";


const app = express();
const redisClient = new Redis();
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: process.env.ORIGIN_FRONT,
    credentials: true,
};
app.use(session({
    store: new RedisStore({
        client: redisClient,
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: "lax",
    }
}))
app.use(cors(corsOptions));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/employees', isAuth, employeeRoutes);
app.use('/courses', isAuth, courseRoutes);
app.use('/users', isAuth, userRoutes);
app.use(isAuth, homeRoutes);

userStart().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error("Error al iniciar el servidor:", error);
});