import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaDTO,  } from '../../models/categorias/categoria.dto';
import { CategoriaConSubcategoriasDTO } from '../../models/categorias/categoria-sub.dto';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:3000/api/categoria';

  constructor(private http: HttpClient) {}

  // Obtener todas las categorías
  obtenerCategorias(): Observable<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(this.apiUrl);
  }

  // Obtener categorías con subcategorías y cantidad de productos
  obtenerCategoriasConSubcategorias(): Observable<CategoriaConSubcategoriasDTO[]> {
    return this.http.get<CategoriaConSubcategoriasDTO[]>(`${this.apiUrl}/con-subcategorias`);
  }

  // Crear nueva categoría (con o sin ícono)
  crearCategoria(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Actualizar categoría
  actualizarCategoria(id: number, data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar categoría
  eliminarCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
