import { Router } from "express";
import {
  upload,
  uploadFile,
  listFiles,
  moveToRecycle,
  listRecycleFiles,
  clearRecycle,
  getFolderSizes,
  sendSummaryEmail
} from "../controllers/uploadController.js";

const router = Router();

// Ruta para subir archivo
router.post("/", upload.single("file"), uploadFile);

// Ruta para listar los archivos subidos
router.get("/", listFiles);

// Ruta para mover un archivo a la papelera
router.post("/recycle/:fileName", moveToRecycle);

// Ruta para listar archivos en la papelera
router.get("/recycle", listRecycleFiles);

// Ruta para vaciar la papelera completamente
router.delete("/recycle", clearRecycle);

// Ruta para obtener los tamaños de las carpetas
router.get('/sizes', getFolderSizes);

// Ruta para envio de mail con Sendgrid
router.post("/send-summary", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Se requiere un correo electrónico" });
  }

  try {
    await sendSummaryEmail(email);
    res.json({ message: "Resumen enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({ error: "Error al enviar el correo" });
  }
});

export default router;
