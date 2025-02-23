# Proyecto Peliculas

Este proyecto consta de una aplicación que incluye:
- **Base de datos**: MongoDB
- **Backend**: Node.js
- **Frontend**: React

## Descripción

El proyecto utiliza Docker para ejecutar todos los servicios en contenedores. La base de datos MongoDB tiene una base de datos llamada **movies** con cuatro tablas:

- **comments**: Almacena información sobre los comentarios de las peliculas.
- **favorite**: Almacena las peliculas favoritos de los usuarios.
- **movies**: Almacena las peliculas.
- **users**: Almacena los usuarios.

El backend está hecho con Node.js y proporciona las siguientes rutas:


- Endpoin para la autenticacion de inicio de sesion.
  ```js
  app.use("/api/auth", authRoutes);
  ```

- Endpoin para los usuarios.
    ```js
    app.use("/api/users", userRoutes);
    ``` 
- Endpoin para el manejo de las peliculas.
  ```js
    app.use("/api/movie", movieRoutes);
  ```
- Endpoin para el manejo de las peliculas favoritas.
  ```js
    app.use("/api/favorite", favRoutes);
  ```
- Endpoin para el manejo de los comentarios de las peliculas.
  ```js
    app.use("/api/comment", commRoutes);
  ```

## Requisitos

- **Docker**: Para crear y ejecutar contenedores.
- **Docker Compose**: Para orquestar los contenedores.

## Estructura del Proyecto

El proyecto se divide en los siguientes servicios:

- **MongoDB**: Contenedor para la base de datos.
- **Backend (Node.js)**: API.
- **Frontend (React)**: Interfaz de usuario.

## Despliegue con Docker Compose

Para desplegar el proyecto con Docker Compose, ejecuta el siguiente comando:

```bash
docker-compose up --build
```
## Vista endpoints, Pagina y Base de Datos

### Para ingresar a la página web del front:
- http://localhost:5173/

### Para ingresar al mongoExpress y visualizar la base de datos: 
- http://localhost:8081/
- Usuario: isaias
- Contraseña: hlanz

