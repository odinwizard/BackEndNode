import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema({
    qrCode: {
        type: String,
        required: true
    },
    input: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {timestamps: true});


const qrCode = mongoose.model("QrCode", qrCodeSchema);
export default qrCode;