import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CategoriaDTO } from '../../../models/categorias/categoria.dto';
import { CategoriaService } from '../../../services/categorias/categoria.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-categorias-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './categorias-admin.component.html',
  styleUrls: ['./categorias-admin.component.css']
})
export class CategoriasAdminComponent implements OnInit {
  categorias: CategoriaDTO[] = [];
  formCategoria!: FormGroup;
  imagenSeleccionada?: File;
  previewUrl?: string;
  editando = false;
  categoriaActualId?: number;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formCategoria = this.fb.group({
      nombre: ['', Validators.required]
    });

    this.cargarCategorias();
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

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.imagenSeleccionada = input.files[0];

    const reader = new FileReader();
    reader.onload = () => this.previewUrl = reader.result as string;
    reader.readAsDataURL(this.imagenSeleccionada);
  }

  guardarCategoria(): void {
    if (this.formCategoria.invalid) {
      this.alert.mostrarError('El nombre de la categoría es obligatorio.', 'Campos incompletos');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.formCategoria.value.nombre);

    if (this.imagenSeleccionada) {
      formData.append('icono', this.imagenSeleccionada);
    }

    if (this.editando && this.categoriaActualId !== undefined) {
      this.categoriaService.actualizarCategoria(this.categoriaActualId, formData).subscribe({
        next: () => {
          this.alert.mostrarExito('Categoría actualizada correctamente');
          this.resetFormulario();
          this.cargarCategorias();
        },
        error: err => {
          console.error('Error al actualizar categoría:', err);
          this.alert.mostrarError('No se pudo actualizar la categoría.');
        }
      });
    } else {
      this.categoriaService.crearCategoria(formData).subscribe({
        next: () => {
          this.alert.mostrarExito('Categoría creada correctamente');
          this.resetFormulario();
          this.cargarCategorias();
        },
        error: err => {
          console.error('Error al crear categoría:', err);
          this.alert.mostrarError('No se pudo crear la categoría.');
        }
      });
    }
  }

  seleccionar(categoria: CategoriaDTO): void {
    this.editando = true;
    this.categoriaActualId = categoria.id;
    this.formCategoria.patchValue({ nombre: categoria.nombre });
    this.previewUrl = categoria.icono_url || undefined;
    this.imagenSeleccionada = undefined;
  }

  cancelarEdicion(): void {
    this.resetFormulario();
  }

  eliminar(id: number): void {
    this.alert.confirmarEliminacion().then(result => {
      if (result.isConfirmed) {
        this.categoriaService.eliminarCategoria(id).subscribe({
          next: () => {
            this.alert.mostrarExito('Categoría eliminada correctamente');
            this.cargarCategorias();
          },
          error: err => {
            console.error('Error al eliminar categoría:', err);
            this.alert.mostrarError('No se pudo eliminar la categoría.');
          }
        });
      }
    });
  }

  private resetFormulario(): void {
    this.formCategoria.reset();
    this.previewUrl = undefined;
    this.imagenSeleccionada = undefined;
    this.editando = false;
    this.categoriaActualId = undefined;
  }
}
