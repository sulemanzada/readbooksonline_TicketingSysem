const dotenv = require("dotenv");
const express = require("express");
const app = express();
dotenv.config({path:"./config.env"});
require('./db/conn');
const User = require('./model/userSchema');


const PORT = process.env.PORT;

app.get('/', (req, res) => {
res.send(`Hello from server`);
})


app.listen(PORT, ()=>{})
