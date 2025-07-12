import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-enlaces',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-enlaces.component.html',
  styleUrl: './header-enlaces.component.css'
})
export class HeaderEnlacesComponent {
 items = [
    {
      title: 'Colchones',
      img: 'assets/img/colchon-orthopack-euro-base-cama-almohada_1Mzwu.jpg',
      link: '/colchones'
    },
    {
      title: 'Catálogo',
      img: 'assets/img/colchon-orthopack-euro-base-cama-almohada_1Mzwu.jpg',
      link: '/catalogo'
    },
    {
      title: 'Creación para el descanso',
      img: 'assets/img/colchon-orthopack-euro-base-cama-almohada_1Mzwu.jpg',
      link: '/descanso'
    }
  ];
}
