const express = require("express");
const app = express();
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 7028;

app.get('/ping',(req,res) =>{
  res.send('PONG');
});

app.listen(PORT,() =>{
    console.log(`server is running on ${PORT}`)
});




