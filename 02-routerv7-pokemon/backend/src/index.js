import express from 'express';
import cors from 'cors';
import { PORT } from './config/config.js';
import pokemonRouter from './routes/pokemonRoutes.js';
import favoriteRouter from './routes/favoriteRoute.js';
import { addPokemonApiBD } from './helpers/addPokemonApi.js';
import { initializeDatabase } from './models/db.js';

const app = express();

app.use(express.json());
app.use(cors());

// Configurar rutas antes de inicializar la base de datos
app.use("/pokemon", pokemonRouter);
app.use("/favorite", favoriteRouter);

const startServer = async () => {
  try {
    //creo la bd y las tablas si no existen
    await initializeDatabase();
    // Añadir los pokemons a la base de datos
    await addPokemonApiBD();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();