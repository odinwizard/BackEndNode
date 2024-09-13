
const express = require("express");
const dbConnect = require("./config/database");
const todoRoutes = require("./routes/todos");
const app = express();
//load config from env file..
require("dotenv").config();


const PORT = process.env.PORT || 4000 ;

//middleware to parse json request body
app.use(express.json());


//mount the todo api routes..
app.use("/api/v1", todoRoutes);

//start the server...
app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
});
// const dbConnect = dbConnect();
dbConnect();

//default route
app.get("/", (req, res) => {
    res.send(`<h1>This is my Home page</h1>`)
})

