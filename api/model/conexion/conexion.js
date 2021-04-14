const mysql = require('mysql');
function consultar(consulta, id=2) {
    return new Promise ((resolve)=>{
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database : 'insoftar'
        });

        connection.connect(function(err) {
                        if (err != null){
                             resolve(false)
                        }else{
                         
                            connection.query(consulta, function (error, results, fields) {
                                connection.end();
                                if(id==1){
                                    if (error) resolve({"respuesta":false, "data":null});
                                    resolve({"respuesta":true, "data":results}); 
                                }else{
                                    if (error) resolve({"respuesta":false, "data":null});
                                    resolve({"respuesta":true, "data":[]}); 
                                    
                                }
                              
                            });

                           
                        }
                         
        });


    })
}


module.exports = { consultar}; 

