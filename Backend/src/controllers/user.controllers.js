import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret } from '../config/env.js'


const userRegister = async (req, res) => {
    try {
        const { username, email, password, role } = req.body

        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const hash = await bcrypt.hash(password, 10)

        const createdUser = await User.create({
            username,
            email,
            password: hash,
            role
        })

        const newCreatedUser = {
            username,
            email,
            role
        }

        return res.status(201).json({
            message: "User created successfully",
            newCreatedUser,
          });


    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ message: "something went wrong while register" })

    }
}


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({message: "Email and password both required"});
        }

        const user = await User.findOne({email : email});

        if (!user) {
            return res.status(404).json({message: "User not found"})
        }

        bcrypt.compare(password, user.password, function(err, result){
            if (result) {

                const token = jwt.sign(
                    {
                        email
                    },
                    secret
                )

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false
                })

                console.log(token);
                

                return res.status(200).json({message: "Login successfull"})
            }
            else{
                return res.status(401).json({message: "Email or password is incorrect"})
            }
        })

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({message: "Something went wrong while login"});
        
    }
}

const userLogout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
    })

    return res.status(200).json({message: "Logout successfull"})
}

export { userRegister, userLogin, userLogout }