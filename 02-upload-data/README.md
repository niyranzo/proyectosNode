# Proyecto Upload DATA en Node Js

## Paquetes:

- **Express** Frameworks para manejar rutas y crear un servidor 
- **M
- ulter**: Middleware para manejar la subida de ficherons
- **Dotenv**: para la gestion de .env 
crear una app en node que permita hacer un upload de ficheros y los almacene en el backend 
en la carpeta "uploads". Requisitos:
- uso de **Node js**, express, multer (para la gestion de ficheros), tailwind.
- **Sendgrid**: Para enviar correos electrónicos con el resumen de los archivos en las carpetas **`uploads`** y **`recycle`**.


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