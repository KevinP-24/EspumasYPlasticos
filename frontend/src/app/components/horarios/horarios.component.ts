import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faClock,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent {
  contacto = [
    {
      icono: 'map-marker-alt',
      titulo: 'Dirección',
      descripcion: 'Carrera 12 #34-56, Armenia, Quindío'
    },
    {
      icono: 'phone-alt',
      titulo: 'Teléfono',
      descripcion: '(+57) 606 123 4567\n(+57) 300 111 2233 (WhatsApp)'
    },
    {
      icono: 'envelope',
      titulo: 'Correo Electrónico',
      descripcion: 'contacto@espumasplasticos.com'
    },
    {
      icono: 'clock',
      titulo: 'Horario de Atención',
      descripcion: 'Lunes a Viernes: 8:00 a.m. – 5:30 p.m.\nSábados: 8:00 a.m. – 1:00 p.m.'
    }
  ];

  // Icono del pin para el mapa
  pinIcon: IconDefinition = faMapMarkerAlt;

  constructor(library: FaIconLibrary) {
    library.addIcons(faMapMarkerAlt, faPhoneAlt, faEnvelope, faClock);
  }
}
