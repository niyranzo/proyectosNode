import express from "express";
import { addPokemonFavHandler, deletePokemonFavHandler, getPokemonsFavHandler, getPokemonsFavIdHandler } from "../controllers/favoritesController.js";


const router = express.Router();

// Endpoint GET para traer todos los pokemons favs
router.get('/', getPokemonsFavHandler);
// para traer los favs por id 
router.get('/:id', getPokemonsFavIdHandler);
// endpoint post para añadir a favoritos
router.post('/', addPokemonFavHandler);
// endpoint delete para borrarlo de fav
router.delete('/:id', deletePokemonFavHandler);

export default router;
