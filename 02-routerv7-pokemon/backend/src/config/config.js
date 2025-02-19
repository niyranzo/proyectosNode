//config necesarias del proyecto
import dotenv from "dotenv";

dotenv.config(); //carga las variables de entorno del archivo .env en process.env

// exportamos las variables
export const PORT = process.env.PORT || 4000; //si no carga la variable
export const URL = process.env.URL;
