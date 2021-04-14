import { Component, OnInit } from '@angular/core';
import { PersonaserviciosService } from '../../servicio/personaservicios.service';

@Component({
  selector: 'app-listadopersona',
  templateUrl: './listadopersona.component.html',
  styleUrls: ['./listadopersona.component.css']
})
export class ListadopersonaComponent implements OnInit {
  component_agregar:boolean= false; 
  personas:any=[];
  tipo:number=1;  
  datapersona:any=[]; 
  constructor(private servicio:PersonaserviciosService) { }

  ngOnInit(): void {
   this.llamar_listado();
  }

  async llamar_listado() {
    this.personas = await this.servicio.traer_personas(); 
   
  }

  agregar(){
    this.tipo=1; 
    this.component_agregar= !this.component_agregar; 
  }

  cambiar_formulario(){
    this.llamar_listado();
    this.component_agregar= !this.component_agregar; 
  }

  async eliminar(id:any){ 
    this.personas = await this.servicio.eliminar_personas(id); 
    this.llamar_listado();
  }


   editar(persona:any){
    this.datapersona=persona; 
    this.tipo=2; 
    this.component_agregar= !this.component_agregar; 
   }

}
