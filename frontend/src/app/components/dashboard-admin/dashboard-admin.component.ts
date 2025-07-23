import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTags, faLayerGroup, faBox } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {
  // Íconos
  faCategorias = faTags;
  faSubcategorias = faLayerGroup;
  faProductos = faBox;

  constructor(private router: Router) {}

  // Método para navegar a la ruta interna
  navegar(ruta: string): void {
    this.router.navigate([`/admin/${ruta}`]);
  }
}
