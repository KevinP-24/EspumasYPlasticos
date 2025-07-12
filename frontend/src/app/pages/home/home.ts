import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { ValorAgregadoComponent } from "../../components/valor-agregado/valor-agregado.component";
import { UbicacionComponent } from "../../components/ubicacion/ubicacion.component";
import { RedesSocialesComponent } from "../../components/botones-sociales/botones-sociales.component";
import { HeroComponent } from "../../components/header-index/header-index.component";
import { HeaderEnlacesComponent } from "../../components/header-enlaces/header-enlaces.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    ValorAgregadoComponent,
    UbicacionComponent,
    RedesSocialesComponent,
    HeaderEnlacesComponent,
    HeroComponent
],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}
