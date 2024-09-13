
//Server initiated
const express = require('express');
const app = express();

//used to parse req.body in express -> for PUT or POST
const bodyParser = require('body-parser');

app.use(bodyParser.json());



//Active the server on port number
app.listen(3000, () => {
    console.log("server has started port no 3000");
});

//This is a get request
app.get("/", (request, response) => {
    response.send("Hi this is my first backend");
})

app.post("/api/cars", (request, response) => {
        const {name, brand} = request.body;
        console.log(name);
        console.log(brand);
        response.send("Hello this is a post call");
});


//connect to Mongo database
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myDatabase', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then( () => {console.log("Connection Successful")})
.catch( () => {console.log("Recived an error")});


