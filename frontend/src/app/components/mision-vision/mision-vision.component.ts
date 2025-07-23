import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBullseye, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mision-vision-component',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './mision-vision.component.html',
  styleUrl: './mision-vision.component.css'
})
export class MisionVisionComponent {
  bloques = [
    {
      icono: 'bullseye',
      titulo: 'Misión',
      descripcion: `Transformar materias primas en soluciones innovadoras de descanso,
        ofreciendo productos de espuma de alta calidad para hogares, comercios e industrias en todo el país.`
    },
    {
      icono: 'eye',
      titulo: 'Visión',
      descripcion: `Ser reconocidos como líderes en el sector de espumas y plásticos,
        destacándonos por nuestra excelencia, compromiso ambiental y mejora continua hacia el bienestar de nuestros clientes.`
    },
    {
      icono: 'heart',
      titulo: 'Valores',
      descripcion: `
        ✔ Calidad y compromiso<br>
        ✔ Honestidad<br>
        ✔ Innovación<br>
        ✔ Responsabilidad ambiental<br>
        ✔ Servicio al cliente
      `
    }
  ];

  activeIndex: number | null = null;

  setActive(index: number) {
    this.activeIndex = index;
  }

  clearActive() {
    this.activeIndex = null;
  }

  toggleActive(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  constructor(library: FaIconLibrary) {
    library.addIcons(faBullseye, faEye, faHeart);
  }
}
