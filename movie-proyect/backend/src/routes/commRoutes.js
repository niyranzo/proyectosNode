import express from 'express';
import { createComment, getCommentsByUser, getCommentsMovie } from '../controllers/commController.js';

const router = express.Router();

router.post("/", createComment);
router.get("/movie/:idMovie", getCommentsMovie);
router.get("/user/:idUser", getCommentsByUser);

export default router;
