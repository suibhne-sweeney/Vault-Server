import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getAllSongs, getSong, likeSong } from "../controllers/songs.js";

const router = express.Router();

router.get("/all", verifyToken, getAllSongs);
router.get("/:id", verifyToken, getSong);

router.patch("/like/:id", verifyToken, likeSong)

export default router;