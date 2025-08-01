// models/categorias/categoria-sub.dto.ts
export interface SubcategoriaResumenDTO {
  id: number;
  nombre: string;
  cantidad: number;
}

export interface CategoriaConSubcategoriasDTO {
  id: number;
  nombre: string;
  icono_url?: string;
  subcategorias: SubcategoriaResumenDTO[];
}
