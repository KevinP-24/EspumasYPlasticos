/**
 * DTO para Producto
 * Representa un producto con su información completa
 */
export interface ProductoDTO {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  precio: number;
  subcategoria_id: number;
  subcategoria?: string;
  categoria?: string;
  imagenes?: string[]; // URLs de las imágenes del producto
}
