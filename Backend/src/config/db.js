import { mongoUri } from "./env.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log("Connected to DB successfully");
        
    } catch (error) {
        console.log("Connection failed");
        console.log(error.message);
        process.exit();
    }
}

export default connectDB;