const express = require('express');
const app = express();
const dotenv = require("dotenv");
const env = require('dotenv').config();
const connectDB= require("./config/db");
//Server compatibility
//Connect Database
connectDB();

//Load env variables
dotenv.config({path:"./config/config.env"});
const PORT= process.env.PORT || 80;

//For req and res
app.use(express.json());

//Routes
const data = require("./routes/api/data");

//Mount Routes
app.use("/data", data);


app.listen(PORT, ()=> console.log(`Running on port ${PORT}`))

module.exports = app;