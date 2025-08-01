import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriasAdminComponent } from "../../../../app/components/dashboard/categorias-admin/categorias-admin.component";

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, RouterModule, CategoriasAdminComponent],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css'
})
export class Categorias {

}
