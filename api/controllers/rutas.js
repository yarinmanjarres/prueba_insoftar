'use strict'; //para modo estricto
//tiene que estar express instalado
//instalar cors
//imports
const personas_model = require('../model/personas');
//fin imports
const express = require('express');
const cors = require('cors');
const rutas = express.Router(); 
rutas.use(cors()); // para que no moleste los cors 
//para convertir toda la data que ingresa en json 
rutas.use(express.json()); //POST
rutas.use(express.urlencoded({
    extended: false 
  })) //GET
//fin para convertir toda la data que ingresa en json


rutas.get('/ver',personas_model.ver_persona); //1 nombre ruta, rq lo que manda el front, res es responder 
rutas.post('/eliminar',personas_model.eliminar_persona); 
rutas.post('/crear',personas_model.crear_persona); 
rutas.post('/actualizar',personas_model.artualizar_persona); 
 

module.exports= rutas;









