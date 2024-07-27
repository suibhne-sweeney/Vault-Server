import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { 
    addSong, 
    getAllPlaylists, 
    getAllUserPlaylists, 
    getPlaylist, 
    getUserLikedPlaylists, 
    likePlaylist 
} from "../controllers/playlists.js";

const router = express.Router();

/* READ */
router.get("/all", verifyToken, getAllPlaylists)
router.get("/all/user/:id", verifyToken, getAllUserPlaylists) // this gets the users playlists
router.get("/:id", verifyToken, getPlaylist)
router.get("/liked/:id", verifyToken, getUserLikedPlaylists)

/* UPDATE */
router.patch("/like/:id", verifyToken, likePlaylist)
router.patch("/add/:id/:playlistId", verifyToken, addSong);

export default router