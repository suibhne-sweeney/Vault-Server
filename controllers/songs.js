import Song from "../models/Song.js";
import User from "../models/User.js";

/* READ */
export const getSong = async (req, res) => {
    try {
        const { id } = req.params;
        const song = await Song.findById(id);
        res.status(200).json(song);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

/* WRIGHT */
export const createSong = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            song,
            image,
            plays,
            date,
            genres
        } = req.body;
    
        const newSong = new Song({
            name,
            artist: id,
            song,
            image,
            plays,
            date,
            genres
        })
    
    
        const saveSong = await newSong.save();
    
        res.status(201).json(saveSong)   
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

/* UPDATE */
export const likeSong = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const user = await User.findById(userId);
        const song = await Song.findById(id);
        const isLiked = song.likes.get(userId);

        if(isLiked){
            song.likes.delete(userId);
            user.likedSongs.pull(id);
        }else{
            song.likes.set(userId, true);
            user.likedSongs.push(id);
        }
        await song.save()
        await user.save()
        res.status(200).json(song);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}