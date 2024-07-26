import PlayList from "../models/Playlist.js";
import Song from "../models/Song.js";
import User from "../models/User.js";

/* READ */
export const getAllUserPlaylists = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const playlists = await Promise.all(
            user.playlists.map((id) => PlayList.findById(id))
        )

        const formatedPlaylists = await playlists.map(({_id, name, description, image, songs, user}) => {
            return {_id, name, description, image, songs, user}  
        })

        res.status(200).json(formatedPlaylists)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getPlaylist = async (req, res) => {
    try {
        const { id } = req.params;
        const playlist = await PlayList.findById(id).populate("songs")
        
        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


/* WRIGHT */
export const createPlayList = async (req, res) => {
    try{
        const { id } = req.params;
        const {
            name, 
            description,
            image,
            songs
        } = req.body

        const newPlayList = new PlayList({
            name,
            description,
            image,
            songs,
            user: id
        })

        const savePlayList = await newPlayList.save()

        await User.findByIdAndUpdate(
            id, { $addToSet: {playlists: savePlayList.id} }
        )

        res.status(201).json(savePlayList)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

/* UPDATE */
export const likePlaylist = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        console.log(id, userId)

        const user = await User.findById(userId);
        const playlist = await PlayList.findById(id);
        const isLiked = playlist.likes.get(userId);

        if(isLiked){
            playlist.likes.delete(userId);
            user.likedPlaylists.pull(id);
        }else{
            playlist.likes.set(userId, true);
            user.likedPlaylists.push(id);
        }
        await playlist.save()
        await user.save()
        res.status(200).json(playlist);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

export const addSong = async (req, res) => {
    try {
        const { id, playlistId } = req.params;

        const playlist = await PlayList.findByIdAndUpdate(
            playlistId,
            { $addToSet: { songs: id }},
            { new: true}
        ).populate("songs");

        res.status(200).json(playlist);
    } catch (err){
        res.status(404).json({error: err.message});
    }
}