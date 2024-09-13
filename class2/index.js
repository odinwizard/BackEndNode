
const express = require("express");
const dbConnect = require("./config/database");
const todoRoutes = require("./routes/todos");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 4000 ;

app.use(express.json());



app.use("/api/v1", todoRoutes);

app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
});
// const dbConnect = dbConnect();
dbConnect();

app.get("/", (req, res) => {
    res.send(`<h1>This is my Home page</h1>`)
})

