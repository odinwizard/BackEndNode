import QRCode from "qrcode";
import QrCode from "../models/qrCode.model.js";


export const createQrCode = async (req, res) => {
    try {
        const input = req.body.input;

        const qrCode = await QRCode.toDataURL(input);
        const newQrCode = new QrCode({
            qrCode,
            input
        });
        await newQrCode.save();
        return res.status(201).render("index", { qrCode });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const deleteQrCode = async (req, res) => {
    try {
        const deletedQrCode = await QrCode.findOneAndDelete({}, { sort: { createdAt: -1 } });

        if (!deletedQrCode) {
            return res.status(404).render("index", { qrCode: null, message: "No QR Code found to delete" });
        }
        // Render the page without the QR Code
        return res.redirect("/");
    } catch (error) {
        console.error("Error in deleteQrCode controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const downloadAndDelet = async (req, res) => {
    try {
        // Use the correct model (QrCode) to find the most recent QR Code
        const myCode = await QrCode.findOne({}, {}, { sort: { createdAt: -1 } });

        if (!myCode) {
            return res.status(404).json({ message: "No QR Code found" });
        }

        // Remove the base64 prefix and convert to a buffer
        const codedData = myCode.qrCode.replace("data:image/png;base64,", ""); // Remove the base64 prefix
        const img = Buffer.from(codedData, "base64");

        // Set headers to download the file
        res.setHeader("Content-Disposition", "attachment; filename=qrCode.png");
        res.setHeader("Content-Type", "image/png");
        res.send(img);

        // Delete the QR Code from the database after sending it
        await QrCode.findByIdAndDelete(myCode._id);
    } catch (error) {
        console.error("Error in downloadAndDelet controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};