/**
 * DTO para Subcategoría
 * Representa una subcategoría con su información básica
 */
export interface SubcategoriaDTO {
  id: number;
  nombre: string;
  categoria_id: number;
  categoria?: { id: number; nombre: string }; // Objeto categoría asociada (viene del join en backend)
}
