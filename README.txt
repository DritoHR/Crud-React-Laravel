Aplicación de Encuestas - README

| Introducción |
La aplicación de encuestas se diseñó como una herramienta para practicar y adentrarse en las tecnologías de desarrollo web, tanto en el frontend como en el backend. El proyecto se divide en dos partes: el backend, alojado en la carpeta /api/, y el frontend, situado en /reactfront/. Esta documentación ofrece una visión general sobre las tecnologías implementadas y la estructura de la aplicación.

| Backend con Laravel |

El backend de la aplicación está fundamentado en el framework Laravel. Sus características principales incluyen:

Modelos: Se establecieron los modelos Survey y User, que administran las tablas de encuestas y usuarios en la base de datos, respectivamente.

Controladores: Para cada modelo se creó un controlador. Estos gestionan las operaciones asociadas con encuestas y usuarios, como la creación, lectura, actualización y eliminación de registros.

Rutas: Definidas en el archivo routes/api.php, estas rutas facilitan las peticiones HTTP a los controladores, permitiendo la interacción con la base de datos.

| Frontend con React |

El frontend, desarrollado con React, se encuentra en /reactfront/. Sus características más sobresalientes son:

Componentes React: Cada componente tiene su propio archivo, y están organizados en carpetas según su funcionalidad, lo que facilita su gestión y comprensión.

Gestión de Rutas: Se utiliza React Router DOM para administrar las rutas, logrando una navegación fluida entre las distintas vistas.

Autenticación y Autorización: Se implementó un sistema de roles de usuario para controlar el acceso y la autenticación. Estos roles se guardan en el almacenamiento local del navegador. No se consideró necesario emplear tokens para autenticación en el backend.

Formularios y Estilos: Se diseñaron formularios y estilos personalizados. Estos se mantienen junto con sus componentes respectivos para facilitar su acceso. También se ha hecho uso de Bootstrap para mejorar la estética.

| Tecnologías Implementadas |

En el desarrollo del proyecto, se utilizaron las siguientes tecnologías:

-Backend: Laravel
-Frontend: React
-Gestión de Rutas: React Router DOM
-Comunicación con el Backend: Axios

| Instalación y Puesta en Marcha |

Base de datos:

-Iniciar servidor de base de datos (en mi caso, uso MySQL - Apache con XAMPP).
-Crear una base de datos llamada "survey_bd".
-Navegar a la carpeta /api/ desde la consola de comandos.
-Importar la base de datos desde el archivo proporcionado o ejecutar las migraciones.
-Ejecutar seeders. Es opcional pero recomendado para probar la aplicación. Estos crean 8 encuestas y cuentas para iniciar sesión (admin: admin@test.com, contraseña: adminPassword y user: user@test.com, contraseña: userPassword).

Backend:

-Desde la consola de comandos, navegar a /api/.
-Ejecutar php artisan serve para iniciar el servidor del backend.

Frontend:

-Navegar a la carpeta /reactfront desde la consola.
-Ejecutar npm install para instalar las dependencias. (Puede haber advertencias por una dependencia obsoleta; es algo que he notado y planeo corregir mas adelante porque no he tenido tiempo, a pesar de ello la aplicación funciona perfectamente).
-Tras la instalación, ejecutar npm start para lanzar el servidor frontend. La aplicación estará disponible en localhost:3000 (si el puerto no está ocupado).

Reflexiones Finales

Este proyecto ha despertado mi curiosidad sobre las tecnologías empleadas y me ha motivado a seguir explorándolas en profundidad.

¡Gracias por visitar y explorar mi aplicación de encuestas!