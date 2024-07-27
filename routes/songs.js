import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getAllSongs, getLikedSongs, getSong, likeSong } from "../controllers/songs.js";

const router = express.Router();

router.get("/all", verifyToken, getAllSongs);
router.get("/:id", verifyToken, getSong);
router.get("/liked/:id", verifyToken, getLikedSongs)

router.patch("/like/:id", verifyToken, likeSong)

export default router;