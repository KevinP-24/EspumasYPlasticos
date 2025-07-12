import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-contacto',
  standalone : true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent
],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {

}
