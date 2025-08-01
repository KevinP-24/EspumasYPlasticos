import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from "../../shared/footer/footer.component";
import { HeaderContactoComponent } from "../../components/header-contacto/header-contacto.component";
import { WhatsappComponent } from "../../components/whatsapp/whatsapp.component";
import { HorariosComponent } from "../../components/horarios/horarios.component";
import { ValorAgregadoComponent } from "../../shared/valor-agregado/valor-agregado.component";
import { RedesSocialesComponent } from "../../shared/botones-sociales/botones-sociales.component";

@Component({
  selector: 'app-contacto',
  standalone : true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    HeaderContactoComponent,
    WhatsappComponent,
    HorariosComponent,
    ValorAgregadoComponent,
    RedesSocialesComponent
],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {

}
