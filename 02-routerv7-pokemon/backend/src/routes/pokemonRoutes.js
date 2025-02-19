import express from "express";
import {  getPokemonsHandler, getPokemonsIdandNameHandler } from "../controllers/pokemonController.js";


const router = express.Router();

// traer todos los pokemons
// Endpoint GET para traer todos los pokemons
router.get('/', getPokemonsHandler);
// traer los pokemons ya sea por id o por su nombre
router.get('/:value', getPokemonsIdandNameHandler);

export default router;
