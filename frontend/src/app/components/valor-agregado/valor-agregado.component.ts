import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faTags,
  faShippingFast,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-valor-agregado',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './valor-agregado.component.html',
  styleUrls: ['./valor-agregado.component.css']
})
export class ValorAgregadoComponent {
  beneficios = [
    {
      icono: 'tags',
      titulo: 'Mejor oferta en línea',
      descripcion: '¡Encuentra descuentos!'
    },
    {
      icono: 'shipping-fast',
      titulo: 'Envío a todo el país',
      descripcion: 'Garantía y seguridad'
    },
    {
      icono: 'shopping-cart',
      titulo: 'Compra fácil y segura',
      descripcion: '¡Promociones exclusivas en línea!'
    }
  ];

  constructor(library: FaIconLibrary) {
    library.addIcons(faTags, faShippingFast, faShoppingCart);
  }
}
