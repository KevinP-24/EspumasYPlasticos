import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';



@Component({
  selector: 'app-contacto',
  standalone : true,
  imports: [
    CommonModule,
    NavbarComponent
  ],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {

}
