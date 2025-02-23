// gestiono la conexion de la base de datos mongo 
import dotenv from "dotenv";
import mongoose from "mongoose";

// uso variables de entrono
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        console.log("Conexion existosa a mongodb");
    } catch (error) {
        console.error("Error con la conexion de la bd", error);
        process.exit();
    }
}

export default connectDB;