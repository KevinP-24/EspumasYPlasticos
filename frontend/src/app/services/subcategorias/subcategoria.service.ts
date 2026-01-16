import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubcategoriaDTO } from '../../models/subcategorias/subcategoria.dto';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {
  private apiUrl = 'http://localhost:3000/api/subcategoria';

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las subcategorías con su categoría asociada
   * @returns Observable<SubcategoriaDTO[]>
   */
  obtenerSubcategorias(): Observable<SubcategoriaDTO[]> {
    return this.http.get<SubcategoriaDTO[]>(this.apiUrl);
  }

  /**
   * Obtener subcategorías filtradas por categoría
   * @param categoriaId ID de la categoría
   * @returns Observable<SubcategoriaDTO[]>
   */
  obtenerSubcategoriasPorCategoria(categoriaId: number): Observable<SubcategoriaDTO[]> {
    return this.http.get<SubcategoriaDTO[]>(
      `${this.apiUrl}?categoria_id=${categoriaId}`
    );
  }

  /**
   * Crear una nueva subcategoría
   * @param nombre Nombre de la subcategoría (requerido)
   * @param categoriaId ID de la categoría asociada (requerido)
   * @returns Observable<any>
   */
  crearSubcategoria(nombre: string, categoriaId: number): Observable<any> {
    return this.http.post(this.apiUrl, {
      nombre,
      categoria_id: categoriaId
    });
  }

  /**
   * Actualizar una subcategoría existente
   * @param id ID de la subcategoría
   * @param nombre Nuevo nombre (requerido)
   * @param categoriaId Nueva categoría (requerido)
   * @returns Observable<any>
   */
  actualizarSubcategoria(id: number, nombre: string, categoriaId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, {
      nombre,
      categoria_id: categoriaId
    });
  }

  /**
   * Eliminar una subcategoría
   * @param id ID de la subcategoría
   * @returns Observable<any>
   */
  eliminarSubcategoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
