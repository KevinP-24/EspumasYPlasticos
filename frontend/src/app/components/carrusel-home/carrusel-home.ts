import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos.example';
import { ProductoDTO } from '../../models/productos/producto.dto';
import { CarruselFull } from '../../shared/carrusel-full/carrusel-full';


@Component({
  selector: 'app-carrusel-home',
  imports: [CommonModule, CarruselFull],
  templateUrl: './carrusel-home.html',
  styleUrl: './carrusel-home.css'
})
export class CarruselHome implements OnInit {
  productos: ProductoDTO[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.productos = this.productosService.getProductosEjemplo();
  }
}
