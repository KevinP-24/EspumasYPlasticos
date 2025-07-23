import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nosotros-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent implements OnInit, OnDestroy {
  imagenesCarrusel = [
    { url: 'assets/img/colchon-orthopack-euro-base-cama-almohada_1Mzwu.jpg', alt: 'Producción de espumas' },
    { url: 'assets/img/premium_photo-1661595077028-9ff236368cb5.jpeg', alt: 'Productos terminados' },
    { url: 'assets/img/colchon-orthopack-euro-base-cama-almohada_1Mzwu.jpg', alt: 'Transformación de materiales' }
  ];

  currentSlide = 0;
  intervalo: any;

  ngOnInit(): void {
    this.intervalo = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.imagenesCarrusel.length;
    }, 4000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }
}
