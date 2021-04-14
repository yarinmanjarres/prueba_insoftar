import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import swal from 'sweetalert2'; 


@Injectable({
  providedIn: 'root'
})
export class PersonaserviciosService {
  ruta:String= "http://127.0.0.1:4004/persona/"; 
  constructor(private http: HttpClient ) { }
  

  traer_personas(): any{
    return new Promise ((resolve)=>{
     this.http.get(`${this.ruta}ver`).subscribe((res:any) => {
        resolve(res.data)
      },error=>{
        resolve([]); 
      });
    });
  }


  eliminar_personas(id:any): any{
    return new Promise ((resolve)=>{
     this.http.post(`${this.ruta}eliminar`, {id}).subscribe((res:any) => {
        resolve(res.data)
      },error=>{
        resolve([]); 
      });
    });
  }


  insertar_persona(data:any): any{
    return new Promise ((resolve)=>{
     this.http.post(`${this.ruta}crear`, {data}).subscribe((res:any) => {
        resolve(res);
      },error=>{
        resolve(false); 
      });
    });
  }

  actualizar(data:any): any{
    return new Promise ((resolve)=>{
     this.http.post(`${this.ruta}actualizar`, {data}).subscribe((res:any) => {
        resolve(res)
      },error=>{
        resolve([]); 
      });
    });
  }



  alerta(titulo="Alerta", text_boton="Aceptar", icon_tipo:String="success"): any{
    return new Promise ((resolve)=>{
      swal.fire({
        icon:"success",
        title: titulo,       
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: text_boton
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true); 
        }else if (
          result.dismiss === swal.DismissReason.cancel
        ){
          resolve(true);
        }
      })
    });
  }



}
