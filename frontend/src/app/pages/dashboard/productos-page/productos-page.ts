import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductosAdminComponent } from "../../../../app/components/dashboard/productos-admin/productos-admin.component";

@Component({
  selector: 'app-productos-page',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductosAdminComponent],
  templateUrl: './productos-page.html',
  styleUrl: './productos-page.css'
})
export class ProductosAdmin {

}
