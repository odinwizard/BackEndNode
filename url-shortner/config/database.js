
import { config } from "dotenv";
import mongoose from "mongoose";
config();


const connectionDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed');
        console.log(error);
        process.exit(1);
    }
}

export default connectionDb;


