import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AliadosComponent } from "../../components/aliados/aliados.component";
import { NosotrosComponent } from "../../components/nosotros/nosotros.component";
import { MisionVisionComponent } from "../../components/mision-vision/mision-vision.component";
import { LineaDeTiempoComponent } from "../../components/linea-de-tiempo/linea-de-tiempo.component";
import { EmpleadosComponent } from "../../components/empleados/empleados.component";

@Component({
  selector: 'app-nosotros',
  imports: [NavbarComponent, FooterComponent, AliadosComponent, NosotrosComponent, MisionVisionComponent, LineaDeTiempoComponent, EmpleadosComponent],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css'
})
export class Nosotros {

}
