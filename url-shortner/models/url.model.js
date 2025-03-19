import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    urlcode: String,
    longUrl: String,
});

export default mongoose.model('Url', urlSchema);