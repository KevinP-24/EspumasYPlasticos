import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTags, faLayerGroup, faBox } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-view-component',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './dashboard-view-component.component.html',
  styleUrls: ['./dashboard-view-component.component.css']
})
export class DashboardViewComponentComponent {
  faCategorias = faTags;
  faSubcategorias = faLayerGroup;
  faProductos = faBox;

  constructor(private router: Router) {}

  navegar(ruta: string): void {
    this.router.navigate([`/admin/${ruta}`]);
  }
}
