import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const {
            username,
            firstName,
            lastName,
            email,
            password,
            dateOfBirth,
            gender,
            picturePath,
            userType
        } = req.body

        const salt = await bcrypt.genSalt(); // make the hash methond 
        const passwordHash = await bcrypt.hash(password, salt); // pass the password and hash methoed to encrypt the password

        const newUser = new User({
            username,
            firstName,
            lastName,
            email,
            password: passwordHash,
            dateOfBirth,
            gender,
            picturePath,
            userType        
        })

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "It seems you already have an account, please log in"})    

        const saveUser = await newUser.save();
        res.status(201).json(saveUser); // 201 means user has been created
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email }).select("+password")
        if(!user) return res.status(400).json({ msg: "User does not exist."});

        const isMatch = await bcrypt.compare(password, user.password); // compares hashed password in database to hashed password entered during login
        if(!isMatch) return res.status(400).json({ msg: "Invalid credentials."});

        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET)
        delete user.password;
        res.status(200).json({token, user});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
