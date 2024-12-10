# Sistema de Gestión de Empleados y Cursos (Backend)

Este proyecto es una API REST desarrollada con **Express.js**, diseñada para gestionar usuarios, empleados y sus cursos. Maneja autenticación basada en sesiones con **express-session** y **Redis**, y utiliza **Prisma** como ORM para interactuar con una base de datos PostgreSQL.

## Características
- **Usuarios**: Registrar, actualizar y eliminar cuentas.  
- **Empleados**: Administración de datos de empleados.  
- **Cursos**: Gestión de cursos asignados a empleados.  
- **Autenticación con sesiones**: Manejo de inicio de sesión y cierre de sesión mediante sesiones almacenadas en Redis.

## Tecnologías utilizadas
- **Node.js** con **Express.js**: Framework backend.  
- **pnpm**: Gestor de dependencias rápido y eficiente.  
- **Redis**: Almacenamiento de sesiones.  
- **express-session**: Middleware para sesiones en el servidor.  
- **Prisma**: ORM para interactuar con PostgreSQL.  
- **PostgreSQL**: Base de datos relacional.  

## Instalación y configuración
1. Clona este repositorio:  
   git clone https://github.com/sebasdex/backend-passport.git
   accede a la carpeta del proyecto

2. Instala las dependencias:
   pnpm install

3. Configura las variables de entorno en un archivo .env:
   DATABASE_URL=tu-conexion  
   REDIS_URL=tu-conexion  
   SESSION_SECRET=tu-password
4. Ejecuta las migraciones de Prisma para preparar la base de datos:
   pnpm prisma migrate dev
5. Inicia el servidor en modo desarrollo:
   pnpm dev

## Rutas Principales

**Usuarios**
  - POST /api/users: Registrar un nuevo usuario.
  - PUT /api/users/:id: Actualizar un usuario existente.
  - DELETE /api/users/:id: Eliminar un usuario.
  
**Empleados**
  - POST /api/employees: Registrar un empleado.
  - PUT /api/employees/:id: Actualizar información de un empleado.
  - GET /api/employees/:id: Obtener información de un empleado.
  
**Cursos**
  - POST /api/courses: Registrar un curso.
  - GET /api/courses/:employeeId: Obtener cursos asignados a un empleado.
  - PUT /api/courses/:id: Actualizar detalles de un curso.
**Autenticación**
  - POST /api/auth/login: Iniciar sesión.
  - POST /api/auth/logout: Cerrar sesión.
  - GET /api/auth/session: Verificar la sesión activa.

## Estructura del proyecto
```plaintext
src/
├── controller/         # Controladores de la lógica principal
│   ├── authController.js
│   └── userStart.js
├── middlewares/        # Middlewares para autenticación y roles
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── routes/             # Definición de rutas del API
│   ├── courses/
│   │   └── course.js
│   ├── employees/
│   │   └── employee.js
│   ├── home/
│   │   └── home.js
│   └── users/
│       ├── users.js
│       └── auth.js
├── index.js            # Configuración principal del servidor
└── vercel.json         # Configuración para despliegue en Vercel

```
## Despliegue
Este proyecto está configurado para ser desplegado en Vercel. Asegúrate de configurar correctamente las variables de entorno en la plataforma antes de desplegar.





   
