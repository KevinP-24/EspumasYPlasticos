import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubcategoriasAdminComponent } from "../../../../app/components/dashboard/subcategorias-admin/subcategorias-admin.component";

@Component({
  selector: 'app-subcategorias',
  standalone: true,
  imports: [CommonModule, RouterModule, SubcategoriasAdminComponent],
  templateUrl: './subcategorias.html',
  styleUrl: './subcategorias.css'
})
export class Subcategorias {

}
