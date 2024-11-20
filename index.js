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
import { createClient } from "redis";

const app = express();
const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }
});

redisClient.connect().catch((err) => {
    console.error("Error al conectar a Redis:", err);
});

const redisStore = new RedisStore({ client: redisClient, prefix: "session:" });
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: process.env.ORIGIN_FRONT,
    credentials: true,
};
app.use(session({
    store: redisStore,
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: "none",
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