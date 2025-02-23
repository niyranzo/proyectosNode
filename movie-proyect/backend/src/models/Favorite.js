import mongoose from 'mongoose';

// Esquema de Comentarios
const favoriteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
});


export default mongoose.model('Favorite', favoriteSchema);
