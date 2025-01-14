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
import PrismaSessionStore from "./src/controller/sessionStore.js";

const app = express();

const port = process.env.PORT || 3000;

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [process.env.ORIGIN_FRONT, process.env.LOCAL_FRONT];
    if (!origin) {
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Origen no permitido por CORS: ${origin}`);
      callback(new Error("Origen no permitido por CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
    },
    store: new PrismaSessionStore(),
  })
);
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/employees", isAuth, employeeRoutes);
app.use("/courses", isAuth, courseRoutes);
app.use("/users", isAuth, userRoutes);
app.use(isAuth, homeRoutes);

userStart()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error al iniciar el servidor:", error);
  });
