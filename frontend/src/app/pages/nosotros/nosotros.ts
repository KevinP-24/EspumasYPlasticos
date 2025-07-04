import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AliadosComponent } from "../../components/aliados/aliados.component";

@Component({
  selector: 'app-nosotros',
  imports: [NavbarComponent, FooterComponent, AliadosComponent],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css'
})
export class Nosotros {

}
