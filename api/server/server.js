'use strict'; //install http 
const express = require('express');
const app= express(); 
const http = require('http'); 
const rutas = require('../controllers/rutas'); 

app.use('/persona', rutas); 
const servidor = http.createServer(app); 
//node server/server.js

servidor.listen(4004, ()=>{
    console.log("start serve"); 
});






