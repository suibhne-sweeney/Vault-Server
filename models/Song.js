import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
        name: {
            type: String, // name of song
            required: true,
            trim: true,
            min: 3,
            max: 30
        },
        artistId: { // artist ID who made the song
            type: mongoose.Schema.ObjectId,
            ref: 'User', 
            required: true
        },
        artistName:{
            type: String,
            required: true
        },
        song: {
            type: String, // store song file
            required: true
        },
        image: {
            type: String, // store cover art
            required: true
        },
        plays: { // amount of people that have played the song
            type: Number,
            default: 0
        },
        date: {
            type: Date,
            required: true
        },
        genres: {
            type: Array,
            default: []
        },
        likes: {
            type: Map,
            of: Boolean,
            default: {}
        }
        
    }, {timestamps: true}
)

const Song = mongoose.model("Song", SongSchema)
export default Song;