import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from "../../shared/footer/footer.component";
import { PorQueElegirnosComponent } from "../../components/porque-elegirnos.component/porque-elegirnos.component";

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
    PorQueElegirnosComponent
],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {

}
