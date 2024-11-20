import { registerUserValidator, loginUserValidator, updateProfileValidator } from "../validators/user.js";
import { UserModel } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res, next) => {
    try {
        //Validate user input
        const { error, value } = registerUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        //Check if user does not exist
        const user = await UserModel.findOne({ eamil: value.email });
        if (user) {
            return res.status(409).json("User already exists!");
        }
        //Hash their password
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        //Save user to database
        await UserModel.create({
            ...value,
            password: hashedPassword
        });
        //Save confirmation email
        //Respond to request
        res.status(201).json("User registered!");
    } catch (error) {
        next(error);
    }
}

export const userLogin = async (req, res, next) => {
    try {
        //Validate User Input
        const { error, value } = loginUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        //Find one user with identfier
        const user = await UserModel.findOne({ email: value.email })
        if (!user) {
            return res.status(404).json("User does not exist!");
        }
        //Compare their passwords
        const correctPassword = bcrypt.compareSync(value.password, user.password);
        if (!correctPassword) {
            return res.status(401).json("Invalid credentials!");
        }
        //Sign a token for the user
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: "24h" }
        );
        //Respond to request
        res.status(200).json({
            message: "Login succesful",
            accessToken: token
        });
    } catch (error) {
        next(error);
    }
}

export const getProfile = async (req, res, next) => {
    try {
        // Find authenticated user from databse
        const user = await UserModel
            .findById(req.auth.id)
            .select({ password: false });
        // Respond to request
        res.json(user);
    } catch (error) {
        next(error);
    }
}

export const userLogout = (req, res, next) => {
    res.json("User Logged out!");
}

 