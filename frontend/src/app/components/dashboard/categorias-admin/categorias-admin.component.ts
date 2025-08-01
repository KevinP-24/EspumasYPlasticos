import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaDTO } from '../../../models/categorias/categoria.dto';
import { CategoriaService } from '../../../services/categorias/categoria.service';
import { RouterModule } from '@angular/router';

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
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.formCategoria = this.fb.group({
      nombre: ['', Validators.required]
    });

    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe({
      next: res => this.categorias = res,
      error: err => console.error('Error al cargar categorías:', err)
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
    const formData = new FormData();
    formData.append('nombre', this.formCategoria.value.nombre);

    if (this.imagenSeleccionada) {
      formData.append('icono', this.imagenSeleccionada);
    }

    if (this.editando && this.categoriaActualId !== undefined) {
      this.categoriaService.actualizarCategoria(this.categoriaActualId, formData).subscribe({
        next: () => {
          this.resetFormulario();
          this.cargarCategorias();
        },
        error: err => console.error('Error al actualizar categoría:', err)
      });
    } else {
      this.categoriaService.crearCategoria(formData).subscribe({
        next: () => {
          this.resetFormulario();
          this.cargarCategorias();
        },
        error: err => console.error('Error al crear categoría:', err)
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
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categoriaService.eliminarCategoria(id).subscribe({
        next: () => this.cargarCategorias(),
        error: err => console.error('Error al eliminar categoría:', err)
      });
    }
  }

  private resetFormulario(): void {
    this.formCategoria.reset();
    this.previewUrl = undefined;
    this.imagenSeleccionada = undefined;
    this.editando = false;
    this.categoriaActualId = undefined;
  }
}
