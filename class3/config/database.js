const mongoose = require('mongoose');
require("dotenv").config();


const connectWithDB = async () => {

    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
        console.log(error);
        
    }

};
module.exports = connectWithDB;

