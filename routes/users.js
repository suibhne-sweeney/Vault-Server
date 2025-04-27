import express from "express";
import {
    getUser,
    getFollowing,
    followOrUnfollow,
    getFollowers,
    getAllUsers
} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/all", verifyToken, getAllUsers)
router.get("/:id", verifyToken, getUser) // this gets the user by thier ID
router.get("/following/:id", verifyToken, getFollowing) // this get the users followed artiest
router.get("/followers/:id", verifyToken, getFollowers)

/* UPDATE */
router.patch("/:id/:followedId", verifyToken, followOrUnfollow)

export default router;