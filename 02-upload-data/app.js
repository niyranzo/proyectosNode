// app.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import uploadRoutes from "./routers/uploadRoutes.js"
import sgMail from '@sendgrid/mail';
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Obtener la ruta absoluta de la carpeta actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta de la carpeta "uploads"
const uploadsDir = path.join(__dirname, "uploads");
// key del sendgrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Verificar si la carpeta "uploads" existe, si no, crearla
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`Carpeta "${uploadsDir}" creada exitosamente.`);
} else {
  console.log(`Carpeta "${uploadsDir}" ya existe.`);
}
app.use(express.json());

// Servir archivos estáticos (como el HTML)
app.use(express.static(path.join(__dirname, "public")));

// Usar las rutas para manejar uploads/files
app.use("/uploads", uploadRoutes);



// Configuramos el puerto donde va a escuchar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});