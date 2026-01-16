import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SubcategoriaDTO } from '../../../models/subcategorias/subcategoria.dto';
import { CategoriaDTO } from '../../../models/categorias/categoria.dto';
import { SubcategoriaService } from '../../../services/subcategorias/subcategoria.service';
import { CategoriaService } from '../../../services/categorias/categoria.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-subcategorias-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './subcategorias-admin.component.html',
  styleUrls: ['./subcategorias-admin.component.css']
})
export class SubcategoriasAdminComponent implements OnInit {
  subcategorias: SubcategoriaDTO[] = [];
  categorias: CategoriaDTO[] = [];
  formSubcategoria!: FormGroup;
  editando = false;
  subcategoriaActualId?: number;

  constructor(
    private fb: FormBuilder,
    private subcategoriaService: SubcategoriaService,
    private categoriaService: CategoriaService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formSubcategoria = this.fb.group({
      nombre: ['', Validators.required],
      categoria_id: ['', Validators.required]
    });

    this.cargarCategorias();
    this.cargarSubcategorias();
  }

  volverAlDashboard(): void {
    this.router.navigate(['/admin']);
  }

  cargarCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe({
      next: res => this.categorias = res,
      error: err => this.alert.mostrarError('Error al cargar categorías.')
    });
  }

  cargarSubcategorias(): void {
    this.subcategoriaService.obtenerSubcategorias().subscribe({
      next: res => this.subcategorias = res,
      error: err => this.alert.mostrarError('Error al cargar subcategorías.')
    });
  }

  guardarSubcategoria(): void {
    if (this.formSubcategoria.invalid) {
      this.alert.mostrarError('Complete todos los campos obligatorios.', 'Campos incompletos');
      return;
    }

    const { nombre, categoria_id } = this.formSubcategoria.value;

    if (this.editando && this.subcategoriaActualId !== undefined) {
      this.subcategoriaService.actualizarSubcategoria(this.subcategoriaActualId, nombre, categoria_id).subscribe({
        next: () => {
          this.alert.mostrarExito('Subcategoría actualizada correctamente');
          this.resetFormulario();
          this.cargarSubcategorias();
        },
        error: err => {
          console.error('Error al actualizar subcategoría:', err);
          this.alert.mostrarError('No se pudo actualizar la subcategoría.');
        }
      });
    } else {
      this.subcategoriaService.crearSubcategoria(nombre, categoria_id).subscribe({
        next: () => {
          this.alert.mostrarExito('Subcategoría creada correctamente');
          this.resetFormulario();
          this.cargarSubcategorias();
        },
        error: err => {
          console.error('Error al crear subcategoría:', err);
          this.alert.mostrarError('No se pudo crear la subcategoría.');
        }
      });
    }
  }

  seleccionar(subcategoria: SubcategoriaDTO): void {
    this.editando = true;
    this.subcategoriaActualId = subcategoria.id;
    this.formSubcategoria.patchValue({
      nombre: subcategoria.nombre,
      categoria_id: subcategoria.categoria_id
    });
  }

  cancelarEdicion(): void {
    this.resetFormulario();
  }

  eliminar(id: number): void {
    this.alert.confirmarEliminacion().then(result => {
      if (result.isConfirmed) {
        this.subcategoriaService.eliminarSubcategoria(id).subscribe({
          next: () => {
            this.alert.mostrarExito('Subcategoría eliminada correctamente');
            this.cargarSubcategorias();
          },
          error: err => {
            console.error('Error al eliminar subcategoría:', err);
            this.alert.mostrarError('No se pudo eliminar la subcategoría.');
          }
        });
      }
    });
  }

  private resetFormulario(): void {
    this.formSubcategoria.reset();
    this.editando = false;
    this.subcategoriaActualId = undefined;
  }

  /**
   * Obtiene el nombre de la categoría por su ID
   * @param categoriaId ID de la categoría
   * @returns Nombre de la categoría o 'Sin categoría'
   */
  obtenerNombreCategoria(categoriaId: number): string {
    const categoria = this.categorias.find(c => c.id === categoriaId);
    return categoria?.nombre || 'Sin categoría';
  }
}
