# Proyecto Upload DATA en Node.js

## Paquetes Utilizados

- **Express**: Framework para manejar rutas y crear un servidor.
- **Multer**: Middleware para manejar la subida de ficheros.
- **Dotenv**: Para la gestión de variables de entorno.
- **SendGrid**: Para enviar correos electrónicos con el resumen de los archivos en las carpetas **`uploads`** y **`recycle`**.

## Descripción del Proyecto

Este proyecto es una aplicación en Node.js que permite subir archivos y almacenarlos en el backend dentro de la carpeta **`uploads`**. Incluye las siguientes tecnologías:
- **Node.js**, Express y Multer para la gestión de archivos.
- **TailwindCSS** para el diseño.
- **SendGrid** para el envío de correos electrónicos.

## Configuración del Entorno

Antes de levantar el contenedor, es necesario crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

- SENDGRID_API_KEY=SG.c9ugGEimRLKdZLOAyL-K1A.ap///EpHx8_zp0L_OAzS5o3PgDes4ZKZHFKh2X1_9Cc4-A (para utilizarlo quita las "///")


Este archivo es esencial para la correcta configuración del servicio de envío de correos electrónicos.

## Despliegue con Docker Compose

Para desplegar el proyecto con Docker Compose, ejecuta el siguiente comando:

```bash
docker-compose up --build
```

Este comando:
- Construirá las imágenes para cada servicio.
- Levantará los contenedores y orquestará la comunicación entre ellos.

Si necesitas detener y eliminar los contenedores, utiliza:

```bash
docker-compose down
```