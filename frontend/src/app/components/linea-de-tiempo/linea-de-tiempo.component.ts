import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // ⬅️ FALTA ESTO
import { faHandshake, faMapMarkedAlt, faIndustry, faGlobe } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-linea-de-tiempo-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule // ⬅️ IMPORTANTE PARA MOSTRAR <fa-icon>
  ],
  templateUrl: './linea-de-tiempo.component.html',
  styleUrl: './linea-de-tiempo.component.css'
})
export class LineaDeTiempoComponent {
  faHandshake = faHandshake;
  faMapMarkedAlt = faMapMarkedAlt;
  faIndustry = faIndustry;
  faGlobe = faGlobe;
}
