import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from "cors"; // prevent unauthorized access to resources on a web page from different origins
import dotenv from "dotenv";
import multer from 'multer'; // allows for uploads of files
import helmet from "helmet"; // automatically adding or removing HTTP headers to comply with web security standards
import morgan from "morgan"; // middleware that logs HTTP requests and errors.
import path from "path";
import { fileURLToPath } from 'url';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import playlistRoutes from "./routes/playlists.js"
import songRoutes from "./routes/songs.js"
import { register } from './controllers/auth.js';
import { createPlayList } from './controllers/playlists.js';
import { createSong } from './controllers/songs.js';
import { verifyToken } from './middleware/auth.js';
import { updateUser } from './controllers/users.js';

/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets"))) // we are storing images locally but in real produciont server we should use AWS S3

/* FILE STOREAGE */
const storage = multer.diskStorage({ // this fuction takes two params destenation and filename and combines them so we can upload to local storage
    destination: function(req, file, cb){
        cb(null, "public/assets"); // path to public folder in local storage
    },
    filename: function(req, file, cb){
        cb(null, file.originalname); // name of file in local storage 
    }
})
const upload = multer({storage});

/* ROUTES WITH FILES */
app.post("/api/auth/regiseter", upload.single("picture"), register); // the register is a function known as a controler and its the logic of our end point
app.post("/api/users/:id/playlists", upload.single("picture"), verifyToken, createPlayList)
app.post("/api/users/:id/songs", upload.fields([
    { name: "sound", maxCount: 1 },
    { name: "picture", maxCount: 1 }
]), verifyToken, createSong);
app.patch("/api/users/:id/update", upload.single("picture"), verifyToken, updateUser);

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/songs", songRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));
