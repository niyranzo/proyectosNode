# Proyecto de Pokémons

Este proyecto consta de una aplicación que incluye:
- **Base de datos**: MariaDB
- **Backend**: Node.js
- **Frontend**: React

## Descripción

El proyecto utiliza Docker para ejecutar todos los servicios en contenedores. La base de datos MariaDB tiene una base de datos llamada **Pokemons** con dos tablas:

- **pokemons**: Almacena información sobre los pokémons.
- **favorite**: Almacena los pokémons favoritos de los usuarios.

El backend está hecho con Node.js y proporciona los siguientes endpoints:

### Endpoints para Pokémons

- **GET /pokemon/**: Trae todos los pokémons.
  ```js
  router.get('/', getPokemonsHandler);
  ```

- **GET /pokemon/:value**: Trae pokémons por ID o por nombre.
  ```js
  router.get('/:value', getPokemonsIdandNameHandler);
  ```

### Endpoints para Favoritos

- **GET /favorite/**: Trae todos los pokémons favoritos.
  ```js
  router.get('/', getPokemonsFavHandler);
  ```

- **GET /favorite/:id**: Trae un pokémon favorito por su ID.
  ```js
  router.get('/:id', getPokemonsFavIdHandler);
  ```

- **POST /favorite/**: Añade un pokémon a favoritos.
  ```js
  router.post('/', addPokemonFavHandler);
  ```

- **DELETE /favorite/:id**: Elimina un pokémon de favoritos por su ID.
  ```js
  router.delete('/:id', deletePokemonFavHandler);
  ```

## Requisitos

- **Docker**: Para crear y ejecutar contenedores.
- **Docker Compose**: Para orquestar los contenedores.

## Estructura del Proyecto

El proyecto se divide en los siguientes servicios:

- **MariaDB**: Contenedor para la base de datos.
- **Backend (Node.js)**: API.
- **Frontend (React)**: Interfaz de usuario.

## Despliegue con Docker Compose

Para desplegar el proyecto con Docker Compose, ejecuta el siguiente comando:

```bash
docker-compose up --build
```

Este comando:
- Construirá las imágenes para cada servicio (MariaDB, Backend y Frontend).
- Levantará los contenedores y orquestará la comunicación entre ellos.

Si necesitas detener y eliminar los contenedores, utiliza:

```bash
docker-compose down
```

