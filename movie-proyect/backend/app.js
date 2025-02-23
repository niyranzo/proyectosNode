import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import movieRoutes from './src/routes/movieRoutes.js';
import favRoutes from './src/routes/favRoutes.js';
import commRoutes from './src/routes/commRoutes.js';
import connectDB from './src/config/db.js';
import addMovies from './src/helper/addMovies.js';

const app = express();

// conf de cors
// cors: 
const alowOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({
    origin: (origin, callback) => {
        if(!origin || alowOrigins.includes(origin)) {
            callback(null, origin);
        }else{
            callback(new Error("Origin not allowed"));
        }
    },
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders:["Content-Type", "Authorization"],
})); //recordar modificar 
app.use(express.json());
app.use(cookieParser());

// conexion con la base de datos
connectDB();
addMovies();

// rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/favorite", favRoutes);
app.use("/api/comment", commRoutes);

export default app;


