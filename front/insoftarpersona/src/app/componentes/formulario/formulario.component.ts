import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import swal from 'sweetalert2'; 
import { PersonaserviciosService } from '../../servicio/personaservicios.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  @Input() tipo:any;
  @Input() persona:any;
  @Output() close = new EventEmitter<boolean>(); 
  formulariopersona!:FormGroup;
  nombre_boton!:String; 
  respuesta_inserccion!:any; 
  id:number=0; 

  constructor(private formBuilder: FormBuilder,
              private servicio: PersonaserviciosService) { } 
 
  ngOnInit(): void {
      this.formulariopersona = this.formBuilder.group({
        nombres: ['', [Validators.required]],
        apellidos: ['', [Validators.required]],
        cedula: ['', [Validators.required, Validators.pattern('^(0*[1-9][0-9,]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$')]],
        correo: ['', [Validators.required, Validators.email]],
        telefono: ['', [Validators.required, Validators.pattern('^(0*[1-9][0-9,]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$')]],
      });
    if(parseInt(this.tipo)==1){
      this.agregar(); 
    }else{
      this.editar(); 
    }
  }

  discriminar_flujo(){ 
    if(this.tipo==1){
      this.crear_persona(); 
    }else{
      this.editar_persona(); 
    }
  }


  agregar(){
    this.nombre_boton= "Agregar_persona"; 
  }

  editar(){
    this.nombre_boton= "editar persona"; 
    this.id= this.persona.id;  
    delete this.persona.id; 
    this.formulariopersona.setValue(this.persona); 
  }


  async editar_persona(){
    let alerta; 
    if(this.formulariopersona.status!="INVALID"){
     this.formulariopersona.value.id= this.id; 
     let respuesta_ediccion = await this.servicio.actualizar(this.formulariopersona.value);
     if(typeof respuesta_ediccion !== 'undefined'){
      this.discriminar_alertas(respuesta_ediccion); 
     } 
    }else{
      this.formulariopersona.markAllAsTouched();
      swal.fire('Oops...', 'presenta campos invalidos', 'error'); 
    }    
  }

async crear_persona(){
  if(this.formulariopersona.status!="INVALID"){
    this.respuesta_inserccion = await this.servicio.insertar_persona(this.formulariopersona.value); 
    if(this.respuesta_inserccion){
      if( typeof this.respuesta_inserccion !== 'undefined'){
        this.discriminar_alertas(this.respuesta_inserccion); 
      }
    }else{
      swal.fire('Oops...', 'ocurrio algun error', 'error'); 
    }
  }else{
    this.formulariopersona.markAllAsTouched();
    swal.fire('Oops...', 'presenta campos invalidos', 'error'); 
  }    
}

async discriminar_alertas(data:any){
  let alerta; 
  let datano; 
  if(data.status=="success"){
    alerta = await this.servicio.alerta(); 
    if(alerta){
      this.salir(); 
    }
  }else{
    datano=data.data[0]; 
    if(datano.existe_cedula == 1 ){
      swal.fire('Oops...', "Existe esta cedula", 'error'); 
    }

    if(datano.existe_correo == 1 ){
      swal.fire('Oops...', "Existe este correo", 'error'); 
    }
   
  }
 
}

  salir(){
    this.close.emit(false); 
  }





}
