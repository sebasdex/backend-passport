# Sistema de Gestión de Empleados y Cursos
 
El desarrollo de este proyecto tiene como objetivo consolidar y mejorar mis habilidades en **JavaScript**, **Express.js** y la creación de APIs RESTful. Estoy interesado en recibir **retroalimentación constructiva** sobre el código, la arquitectura o cualquier aspecto del proyecto que pueda optimizarse, con el fin de seguir aprendiendo y aplicando mejores prácticas en el desarrollo backend.  

Este proyecto es una API desarrollada con **Express.js**, diseñada para gestionar usuarios, empleados y sus cursos. Maneja autenticación basada en sesiones con **express-session**, y utiliza **Prisma** como ORM para interactuar con una base de datos PostgreSQL. 

## Características
- **Usuarios**: Registrar, actualizar y eliminar cuentas.  
- **Empleados**: Administración de datos de empleados.  
- **Cursos**: Gestión de cursos asignados a empleados.
- **Autenticación con sesiones**: Manejo de inicio de sesión y cierre de sesión mediante sesiones almacenadas en db.

## Tecnologías utilizadas
- **Node.js** con **Express.js** 
- **pnpm** 
- **express-session**  
- **Prisma**  
- **PostgreSQL**  

## Instalación y configuración
1. Clona este repositorio:  
   ```
   git clone https://github.com/sebasdex/backend-passport.git  
   cd backend-passport
   ```

2. Instala las dependencias:
   pnpm install

3. Configura las variables de entorno en un archivo .env:  
  ```env
DATABASE_URL= base-datos-conexion
ORIGIN_FRONT= url-frontend
LOCAL_FRONT= url-front-local
COOKIE_SECRET= frasesecreta
NODE_ENV= development
PORT= tu-puerto
ROLE_ONE= rol-principal
ROLE_TWO= rol-secundario
DEVELOPMENT = true/false (si estas en local o en produccion)
```
4. Ejecuta las migraciones de Prisma para preparar la base de datos:  
   - pnpm prisma migrate dev
5. Inicia el servidor en modo desarrollo:  
   - pnpm dev

## Rutas Principales

## Usuarios

- **POST** `/api/addUser`: Registrar un nuevo usuario.
- **GET** `/api/getUsers`: Obtener todos los usuarios.
- **GET** `/api/getUser/:id`: Obtener información de un usuario.
- **PUT** `/api/updateUser/:id`: Actualizar un usuario existente.
- **DELETE** `/api/deleteUser/:id`: Eliminar un usuario.

## Empleados

- **POST** `/api/addEmployee`: Registrar un empleado.
- **GET** `/api/getEmployee/:id`: Obtener información de un empleado.
- **PUT** `/api/updateEmployee/:id`: Actualizar información de un empleado.
- **GET** `/api/getEmployees`: Obtener información de todos los empleados.
- **DELETE** `/api/deleteEmployee/:id`: Eliminar un empleado.

## Cursos

- **POST** `/api/addCourse`: Registrar un curso.
- **GET** `/api/getCourse`: Obtener todos los cursos.
- **GET** `/api/getCourse/:id`: Obtener cursos asignados a un empleado.
- **PUT** `/api/updateCourse/:id`: Actualizar un curso.
- **PUT** `/api/courses/:id`: Actualizar detalles de un curso.
- **DELETE** `/api/deleteCourse/:id`: Eliminar un curso.

## Autenticación

- **POST** `/api/login`: Iniciar sesión.
- **POST** `/api/logout`: Cerrar sesión.
- **GET** `/api/checkSession`: Verificar la sesión activa.

## Home

- **GET** `/`: Acceder a la página principal.


## Estructura del proyecto
```plaintext
src/
├── controller/         
│   ├── authController.js
│   └── userStart.js
|   |__ sessionStore.js
├── middlewares/        
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── routes/            
│   ├── courses/
│   │   └── course.js
│   ├── employees/
│   │   └── employee.js
│   ├── home/
│   │   └── home.js
│   └── users/
│       ├── users.js
│       └── auth.js
├── index.js           
└── vercel.json         

```
## Despliegue
Este proyecto está configurado para ser desplegado.  
Asegúrate de configurar correctamente las variables de entorno en la plataforma antes de continuar.

## Frontend  
Para ver el repositorio del lado del cliente:  
https://github.com/sebasdex/passport-front




   
