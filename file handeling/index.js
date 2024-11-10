//app create......
const express = require("express");
const app = express();

//find port number............
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//adding middleware..............
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload());

//connect to db............
const db = require("./config/database");
db.connect();

//cloud connect..............
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route...........
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

// activate server...........
app.listen(PORT , () => {
    console.log(`App is running at ${PORT}`);
})