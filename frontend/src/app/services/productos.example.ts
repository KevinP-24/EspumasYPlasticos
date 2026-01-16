import { Injectable } from '@angular/core';
import { ProductoDTO } from '../models/productos/producto.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  // Productos de ejemplo
  private productosEjemplo: ProductoDTO[] = [
    {
      id: 1,
      nombre: 'Colchón Tentaflex - Celco',
      descripcion: `Este colchón posee un bloque de espuma naranja de alta densidad que asegura una firmeza perfecta para un sueño reparador ✨. Pero ojo, no sacrifica el confort a la hora de dormir 💤. Además, su cubierta en tela acolchada es tan suave que no querrás salir de la cama ☁️. ¿Lo mejor de todo? ¡Es súper sencillo de lavar gracias a la cremallera incorporada! 💯🔝

• Tela acolchada tejida en punto
• Forro con cremallera incorporada
• Forro con hiladillo
• Altura disponible: 15 cm y 18 cm
• Nivel de firmeza 8 sobre 10
• Garantía: 2 años en estructura interna`,
      cantidad: 15,
      precio: 450000,
      subcategoria_id: 1,
      subcategoria: 'Colchones',
      categoria: 'Descanso',
      imagenes: ['https://res.cloudinary.com/dsv1gdgya/image/upload/v1768524137/product5_k47e7r.jpg']
    },
    {
      id: 2,
      nombre: 'Colchón Confort Verona',
      descripcion: `Poliflex es la mejor opción si buscas la espuma flexible más eficiente para tus colchones. Con una densidad D-30 en su núcleo y lámina Penta gris D-26, y un sistema de acolchado es el más avanzado y cómodo del mercado. ¿Deseas disfrutar de una experiencia relajante? ¡Nuestro colchón VERONA te lo garantiza! ✅💯

• Tela jacquard de alto gramaje, tejido de punto
• Manijas de sujeción en laterales del colchón
• Núcleo espuma Poliflex D-30 de 23 cm espesor
• Pillow independiente en espuma penta D-26
• Altura de 30 cm
• Nivel de firmeza 7 sobre 10

MEDIDAS DISPONIBLES:
• 100x190x30 cm
• 120x190x30 cm
• 140x190x30 cm
• 160x190x30 cm
• 200x200x30 cm

Garantía: 4 años estructura interna`,
      cantidad: 20,
      precio: 580000,
      subcategoria_id: 1,
      subcategoria: 'Colchones',
      categoria: 'Descanso',
      imagenes: ['https://res.cloudinary.com/dsv1gdgya/image/upload/v1768524136/product3_hpbroy.jpg']
    },
    {
      id: 3,
      nombre: 'Colchón Cassata Premium',
      descripcion: `Con su núcleo de cassata de alta densidad y espuma flexible de poliuretano Poliflex en cada cara, este colchón te brinda una superficie firme y cómoda. Ideal para aquellos que buscan un descanso reparador en una superficie dura 👌🏽💯.

• Tela jacquard de alto gramaje, tejido de punto
• Manijas de sujeción en laterales del colchón
• Espuma Poliflex 5 cm de espesor D-30 ambas caras
• Espuma cassata D-100 de 20 cm espesor
• Altura de 30 cm
• Nivel de firmeza 8 sobre 10

MEDIDAS DISPONIBLES:
• 100x190x30 cm
• 120x190x30 cm
• 140x190x30 cm
• 160x190x30 cm
• 200x200x30 cm

Garantía: 4 años estructura interna`,
      cantidad: 12,
      precio: 620000,
      subcategoria_id: 1,
      subcategoria: 'Colchones',
      categoria: 'Descanso',
      imagenes: ['https://res.cloudinary.com/dsv1gdgya/image/upload/v1768524137/product8_naan9p.jpg']
    },
    {
      id: 4,
      nombre: 'Colchón FlexMax Comfort',
      descripcion: `Diseñado para brindar el máximo confort y soporte, el colchón FlexMax Comfort combina capas de espuma de alta densidad con un núcleo independiente que se adapta perfectamente a tu cuerpo 🛏️. Disfruta de noches de sueño profundo y reparador con este colchón de última generación ✨

• Espuma flexible D-35 premium
• Sistema de soporte independiente
• Tela transpirable de alto gramaje
• Manijas laterales reforzadas
• Altura de 28 cm
• Nivel de firmeza 7 sobre 10

MEDIDAS DISPONIBLES:
• 90x190x28 cm
• 110x190x28 cm
• 135x190x28 cm
• 150x190x28 cm

Garantía: 3 años en estructura`,
      cantidad: 18,
      precio: 520000,
      subcategoria_id: 1,
      subcategoria: 'Colchones',
      categoria: 'Descanso',
      imagenes: ['https://res.cloudinary.com/dsv1gdgya/image/upload/v1768524137/product10_u6bke8.jpg']
    },
    {
      id: 5,
      nombre: 'Colchón Deluxe Ortopédico',
      descripcion: `El colchón Deluxe Ortopédico ha sido especialmente diseñado para proporcionar el máximo soporte a tu columna vertebral 🧠. Con su sistema de espuma viscoelástica de última generación, garantiza una distribución perfecta del peso corporal durante toda la noche 💤

• Espuma viscoelástica premium D-40
• Núcleo de espuma ortopédica
• Tela jacquard acolchada
• Manijas reforzadas en 4 lados
• Altura de 32 cm
• Nivel de firmeza 8 sobre 10

MEDIDAS DISPONIBLES:
• 100x190x32 cm
• 120x190x32 cm
• 140x190x32 cm
• 160x190x32 cm

Garantía: 5 años estructura interna`,
      cantidad: 10,
      precio: 750000,
      subcategoria_id: 1,
      subcategoria: 'Colchones',
      categoria: 'Descanso',
      imagenes: ['https://res.cloudinary.com/dsv1gdgya/image/upload/v1768524137/product6_fhn1jz.jpg']
    },
    {
      id: 6,
      nombre: 'Colchón Smart Flex Eco',
      descripcion: `Elaborado con materiales ecológicos y sustentables, el colchón Smart Flex Eco es la opción perfecta para quienes buscan confort y responsabilidad ambiental 🌱. Su estructura de espuma biodegradable ofrece un excelente soporte sin comprometer la naturaleza 💚

• Espuma eco-friendly D-28
• Núcleo cassata de baja densidad
• Tela orgánica tejida
• Cremallera removible para lavado
• Altura de 20 cm
• Nivel de firmeza 6 sobre 10

MEDIDAS DISPONIBLES:
• 90x190x20 cm
• 100x190x20 cm
• 110x190x20 cm
• 135x190x20 cm

Garantía: 2 años estructura`,
      cantidad: 22,
      precio: 380000,
      subcategoria_id: 1,
      subcategoria: 'Colchones',
      categoria: 'Descanso',
      imagenes: ['https://res.cloudinary.com/dsv1gdgya/image/upload/v1768524136/product3_hpbroy.jpg']
    },
    {
      id: 7,
      nombre: 'Colchón ProSleep Platinum',
      descripcion: `La línea ProSleep Platinum ofrece el máximo nivel de lujo y confort con sus capas de espuma premium de última generación ✨. Ideal para dormitorios principales, este colchón proporciona un descanso incomparable con su diseño ergonómico de 5 capas 👑

• Espuma premium D-45 de 3 capas
• Sistema de soporte independiente de bolsillo
• Tela de seda jacquard
• Manijas de cuero sintético
• Altura de 35 cm
• Nivel de firmeza 8 sobre 10

MEDIDAS DISPONIBLES:
• 100x190x35 cm
• 120x190x35 cm
• 140x190x35 cm
• 160x190x35 cm
• 180x200x35 cm

Garantía: 5 años estructura completa`,
      cantidad: 8,
      precio: 920000,
      subcategoria_id: 1,
      subcategoria: 'Colchones',
      categoria: 'Descanso',
      imagenes: ['https://res.cloudinary.com/dsv1gdgya/image/upload/v1768524137/product4_dgjqew.jpg']
    },
    {
      id: 8,
      nombre: 'Colchón BasicFlex Standard',
      descripcion: `Para quienes buscan una opción accesible sin sacrificar calidad, el colchón BasicFlex Standard es la respuesta perfecta 💪. Con espuma de densidad media y construcción robusta, ofrece el mejor relación precio-calidad del mercado 💯

• Espuma flexible D-25
• Núcleo de soporte D-80
• Tela 100% algodón
• Manijas laterales
• Altura de 18 cm
• Nivel de firmeza 7 sobre 10

MEDIDAS DISPONIBLES:
• 80x190x18 cm
• 90x190x18 cm
• 100x190x18 cm
• 110x190x18 cm
• 135x190x18 cm

Garantía: 2 años estructura`,
      cantidad: 35,
      precio: 290000,
      subcategoria_id: 1,
      subcategoria: 'Colchones',
      categoria: 'Descanso',
      imagenes: ['https://res.cloudinary.com/dsv1gdgya/image/upload/v1768524136/product2_blz0tm.jpg']
    },
    {
      id: 9,
      nombre: 'Colchón CloudDream Memory',
      descripcion: `El colchón CloudDream Memory combina la comodidad de la espuma viscoelástica con el soporte firme de su núcleo ortopédico 🌙. Diseñado para adaptarse perfectamente a tu cuerpo y garantizar una postura correcta durante el sueño ✨

• Espuma memory foam D-38
• Núcleo ortopédico reforzado
• Tela acolchada transpirable
• Sistema de ventilación
• Altura de 26 cm
• Nivel de firmeza 7 sobre 10

MEDIDAS DISPONIBLES:
• 90x190x26 cm
• 110x190x26 cm
• 140x190x26 cm
• 160x190x26 cm

Garantía: 4 años estructura interna`,
      cantidad: 14,
      precio: 680000,
      subcategoria_id: 1,
      subcategoria: 'Colchones',
      categoria: 'Descanso',
      imagenes: ['https://res.cloudinary.com/dsv1gdgya/image/upload/v1768524137/product5_k47e7r.jpg']
    },
    {
      id: 10,
      nombre: 'Colchón UltraFirm Executive',
      descripcion: `Para los que prefieren una firmeza extrema, el colchón UltraFirm Executive es la solución definitiva 💎. Con capas de espuma de máxima densidad y soporte industrial, garantiza una base sólida para un sueño profundo y sin interrupciones 🏆

• Espuma ultra firme D-50
• Núcleo cassata D-120 reforzado
• Tela jacquard premium
• Manijas reforzadas de 15 cm
• Altura de 34 cm
• Nivel de firmeza 9 sobre 10

MEDIDAS DISPONIBLES:
• 100x190x34 cm
• 120x190x34 cm
• 140x190x34 cm
• 160x190x34 cm
• 200x200x34 cm

Garantía: 5 años estructura completa`,
      cantidad: 11,
      precio: 850000,
      subcategoria_id: 1,
      subcategoria: 'Colchones',
      categoria: 'Descanso',
      imagenes: ['https://res.cloudinary.com/dsv1gdgya/image/upload/v1768524136/product_pdr6pz.jpg']
    },
    {
      id: 11,
      nombre: 'Colchón LuxeRest Royal',
      descripcion: `Experimenta el máximo lujo y confort con el colchón LuxeRest Royal, diseñado para aquellos que buscan una experiencia de descanso de clase mundial 👑. Con su combinación única de materiales premium y tecnología de espuma viscoelástica, te garantiza noches de sueño profundo y rejuvenecedor ✨

• Espuma viscoelástica D-42 premium
• Núcleo de espuma de alta densidad D-90
• Tela jacquard de seda sintética
• Manijas reforzadas en todos los lados
• Altura de 31 cm
• Nivel de firmeza 7.5 sobre 10

MEDIDAS DISPONIBLES:
• 100x190x31 cm
• 120x190x31 cm
• 140x190x31 cm
• 160x190x31 cm
• 180x200x31 cm

Garantía: 5 años estructura interna`,
      cantidad: 16,
      precio: 795000,
      subcategoria_id: 1,
      subcategoria: 'Colchones',
      categoria: 'Descanso',
      imagenes: ['https://res.cloudinary.com/dsv1gdgya/image/upload/v1768535113/WhatsApp_Image_2026-01-15_at_10.44.06_PM_hpmuf6.jpg']
    },
    {
      id: 12,
      nombre: 'Colchón AquaGel Cooling Plus',
      descripcion: `Si buscas mantener una temperatura ideal durante toda la noche, el colchón AquaGel Cooling Plus es tu solución perfecta ❄️. Con su innovadora tecnología de gel refrigerante y espuma transpirable, duerme fresco y cómodo sin importar la estación del año 🌙

• Espuma con gel refrigerante D-36
• Núcleo transpirable de aire activo
• Tela acolchada termorreguladora
• Sistema de ventilación avanzado
• Manijas laterales reforzadas
• Altura de 29 cm
• Nivel de firmeza 7 sobre 10

MEDIDAS DISPONIBLES:
• 90x190x29 cm
• 110x190x29 cm
• 140x190x29 cm
• 160x190x29 cm

Garantía: 4 años estructura interna`,
      cantidad: 13,
      precio: 710000,
      subcategoria_id: 1,
      subcategoria: 'Colchones',
      categoria: 'Descanso',
      imagenes: ['https://res.cloudinary.com/dsv1gdgya/image/upload/v1768535114/WhatsApp_Image_2026-01-15_at_10.44.22_PM_ugjtjb.jpg']
    }
  ];

  constructor() { }

  /**
   * Obtiene todos los productos de ejemplo
   */
  getProductosEjemplo(): ProductoDTO[] {
    return this.productosEjemplo;
  }

  /**
   * Obtiene un producto específico por ID
   */
  getProductoPorId(id: number): ProductoDTO | undefined {
    return this.productosEjemplo.find(p => p.id === id);
  }

  /**
   * Obtiene productos de una categoría específica
   */
  getProductosPorSubcategoria(subcategoriaId: number): ProductoDTO[] {
    return this.productosEjemplo.filter(p => p.subcategoria_id === subcategoriaId);
  }

  /**
   * Busca productos por nombre
   */
  buscarProductos(termino: string): ProductoDTO[] {
    return this.productosEjemplo.filter(p =>
      p.nombre.toLowerCase().includes(termino.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(termino.toLowerCase())
    );
  }

  /**
   * Obtiene productos con stock disponible
   */
  getProductosConStock(): ProductoDTO[] {
    return this.productosEjemplo.filter(p => p.cantidad > 0);
  }
}
