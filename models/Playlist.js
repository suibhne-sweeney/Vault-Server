import mongoose from "mongoose";

const PlayListSchema = new mongoose.Schema({
        name: {
            type: String,
            min: 3,
            max: 20,
            default: "Your playlist"
        },
        description: {
            type: String,
            max: 300
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        image: {
            type: String,
            default: "https://ik.imagekit.io/8cs4gpobr/spotify/playlists/default.png?updatedAt=1696157039341"
        },
        songs: [{
            type: mongoose.Schema.ObjectId,
            ref: "Song"
        }],
        visibility: {
            type: String,
            enum: ["public", "private"],
            default: "public"
        },
        likes: {
            type: Map,
            of: Boolean,
            default: {}
        },
        collectionType: {
            type: String,
            enum: ["playlist", "album"],
            defualt: "playlist"
        }
        
    }, {timestamps: true}
)

const PlayList = mongoose.model("PlayList", PlayListSchema);
export default PlayList;