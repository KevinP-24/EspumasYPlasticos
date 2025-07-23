import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar, faLeaf, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-por-que-elegirnos',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './porque-elegirnos.component.html',
  styleUrl: './porque-elegirnos.component.css'
})
export class PorQueElegirnosComponent {
  constructor(library: FaIconLibrary) {
    library.addIcons(faStar, faLeaf, faThumbsUp);
  }

  motivos = [
    {
      icono: 'star',
      titulo: 'Calidad Superior',
      texto: 'Productos elaborados con los mejores estándares de calidad.'
    },
    {
      icono: 'leaf',
      titulo: 'Compromiso Ambiental',
      texto: 'Materiales sostenibles y procesos responsables con el medio ambiente.'
    },
    {
      icono: 'thumbs-up',
      titulo: 'Confianza Garantizada',
      texto: 'Más de 20 años respaldando el descanso de nuestros clientes.'
    }
  ];
}
