import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadopersonaComponent } from './componentes/listadopersona/listadopersona.component';
import {HttpClientModule} from '@angular/common/http';
import { FormularioComponent } from './componentes/formulario/formulario.component';


@NgModule({
  declarations: [
    AppComponent,
    ListadopersonaComponent,
    FormularioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
