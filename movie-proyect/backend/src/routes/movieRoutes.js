import express from 'express';
import { getMovieById, getMovies, getMoviesByPage, getMoviesByTitle } from '../controllers/movieController.js';

const router = express.Router();

// Order matters! More specific routes should come first
router.get("/search/:title", getMoviesByTitle);
router.get("/page/:page", getMoviesByPage);
router.get("/:id", getMovieById);
router.get("/", getMovies);

export default router;
