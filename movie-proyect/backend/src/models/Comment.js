import mongoose from 'mongoose';

// Esquema de Comentarios
const commentSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Agregado userId
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true}
});

export default mongoose.model('Comment', commentSchema);
