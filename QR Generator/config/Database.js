import { config } from "dotenv";
import mongoose from "mongoose";
config();

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    } catch (error) {
        console.log("Error connecting to database");
        console.error(error);
    }
}

export default connectionDB;