'use strict';
const conexion = require('./conexion/conexion'); 



const ver_persona = async (rq, res)=> {
        let consulta = "Select * from personas"; 
        let respuesta_consulta = await conexion.consultar(consulta, 1);
        if(respuesta_consulta.respuesta){
            res.status(200).send({"status": "success", "mensaje": "bien", "data": respuesta_consulta.data});
        }else{
            res.status(500).send({"status": "fail", "mensaje": "mal", "data": null});
        }

}

const eliminar_persona = async (rq, res)=> {
   let data= rq.body; 
    let consulta = `DELETE FROM personas WHERE id = ${data.id}`; 
    let respuesta_consulta = await conexion.consultar(consulta);
    if(respuesta_consulta.respuesta){
        res.status(200).send({"status": "success", "mensaje": "bien", "data": respuesta_consulta.data});
    }else{
        res.status(500).send({"status": "fail", "mensaje": "mal", "data": null});
    }
}


const crear_persona= async (rq, res)=>{
   let data= rq.body.data;
   let respuesta= await validar_existencia_correo(data.correo, 0 , data.cedula); 
   if(respuesta.status=="success"){
       respuesta.status="fail";
       res.status(200).send(respuesta);
   }else{
        let consulta = `INSERT INTO personas ( nombres, apellidos, cedula, correo, telefono) VALUES ( "${data.nombres}", "${data.apellidos}", ${data.cedula}, "${data.correo}", ${data.telefono});`; 
        let respuesta_consulta = await conexion.consultar(consulta, 1);
        if(respuesta_consulta.respuesta){
            res.status(200).send({"status": "success", "mensaje": "bien", "data": respuesta_consulta.data});
        }else{
            res.status(500).send({"status": "fail", "mensaje": "mal", "data": null});
        }
        res.status(200).send({"status": "success", "mensaje": "bien"});
    } 
}


const artualizar_persona= async (rq, res)=>{
    let data= rq.body.data; 
    let respuesta= await validar_existencia_correo(data.correo, data.id, data.cedula); 
    if(respuesta.status=="success"){
        respuesta.status="fail"; 
        res.status(200).send(respuesta);
    }else{   
        let consulta = ` UPDATE personas SET nombres ="${data.nombres}", apellidos = "${data.apellidos}", cedula = ${data.cedula},correo = "${data.correo}",telefono = ${data.telefono} WHERE id = ${data.id};`;  
        let respuesta_consulta = await conexion.consultar(consulta, 1);
        if(respuesta_consulta.respuesta){
            res.status(200).send({"status": "success", "mensaje": "bien", "data": respuesta_consulta.data});
        }else{
            res.status(500).send({"status": "fail", "mensaje": "mal", "data": null});
        }
        res.status(200).send({"status": "success", "mensaje": "bien"});
    }
 }

 function validar_existencia_correo(correo, id, cedula) {
    return new Promise (async(res)=>{
    let consulta
    if(id!=0){
        consulta = `Select *,  p.cedula = ${cedula} as existe_cedula, p.correo = "${correo}" as existe_correo  from personas as p WHERE (p.correo = "${correo}" or p.cedula = ${cedula})  and p.id != ${id}`; 
    }else{
        consulta = `Select *,  p.cedula = ${cedula} as existe_cedula, p.correo = "${correo}" as existe_correo from personas as p WHERE p.correo = "${correo}" or p.cedula = ${cedula}`; 
    }
    let respuesta_consulta = await conexion.consultar(consulta, 1);
    console.log(respuesta_consulta, consulta); 
    if(respuesta_consulta.respuesta){
        if(respuesta_consulta.data.length==0){
            res({"status": "fail", "correo no existe": "bien", "data": respuesta_consulta.data}); 
        }
        res({"status": "success", "mensaje": "correo existe", "data": respuesta_consulta.data});
    }else{
        res({"status": "fail", "mensaje": "mal", "data": null});
    }
    }); 
     
 }



 
 



 


 module.exports = {ver_persona, eliminar_persona, crear_persona,artualizar_persona };