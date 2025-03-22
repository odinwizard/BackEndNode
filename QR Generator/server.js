import { config } from "dotenv";
import express from "express";
import connectionDB from "./config/Database.js";
import router from "./routes/qrCodeRoutes.js";

const app = express();
config();

// Middleware to parse JSON
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Route to render the index.ejs file
app.get("/", (req, res) => {
    res.render("index.ejs", { qrCode: null });
});

app.use(express.json());
app.use("/api", router);

connectionDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


