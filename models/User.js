import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName:{
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email:{
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        select: false,
    },
    dateOfBirth:{
        type: Date,
        required: true,
        trim: true
    },
    gender:{
        type: String,
        enum: ['Male', 'Female', 'None'],
        default: 'None',
        required: false
    },
    likedSongs: [{ 
        type: mongoose.Schema.ObjectId, 
        ref: 'Song' 
    }],
    playlists:[{ 
        type: mongoose.Schema.ObjectId,
        ref: 'PlayList' 
    }],
    likedPlaylists: [{ 
        type: mongoose.Schema.ObjectId,
        ref: 'PlayList' 
    }],
    followers: [{ 
        type: mongoose.Schema.ObjectId, 
        ref: 'User' 
    }],
    following: [{
        type: mongoose.Schema.ObjectId, 
        ref: 'User' 
    }],
    userType: {
        type: String,
        enum: ['user', 'artist'],
        default: 'user',
        required: false
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    picturePath:{
        type: String,
        default: "https://ik.imagekit.io/8cs4gpobr/spotify/users/default.jpg?updatedAt=1696157096636"
    },
}, {timestamps: true})

const User = mongoose.model("User", UserSchema);
export default User;