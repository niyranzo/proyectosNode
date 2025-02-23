import mongoose from 'mongoose';

// Esquema de Movie
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: { type: String, required: true },
  backdrop: { type: String, required: true },
  language: { type: String, required: true },
  date: { type: Date, required: true },
  overview: { type: String, required: true },
  trailer: { type: String, required: true },
  genres: { type: [String], required: true }
});




export default mongoose.model('Movie', movieSchema);
