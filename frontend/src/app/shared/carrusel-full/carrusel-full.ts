import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  precio: number;
  subcategoria_id: number;
  subcategoria?: string;
  categoria?: string;
  imagenes?: string[];
}

@Component({
  selector: 'app-carrusel-full',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './carrusel-full.html',
  styleUrls: ['./carrusel-full.css']
})
export class CarruselFull implements OnInit, OnDestroy, AfterViewInit {
  @Input() productos: Producto[] = [];
  @Input() titulo: string = 'Productos';
  @Input() subtitulo?: string = '';
  
  @ViewChild('carouselContent', { static: false }) carouselContent!: ElementRef;
  @ViewChild('carouselTrack', { static: false }) carouselTrack!: ElementRef;

  // Control del carrusel
  currentIndex = 0;
  itemsPerView = 4;
  slideWidth = 0;
  totalWidth = 0;
  isAnimating = false;
  autoPlayInterval: any = null;
  autoPlayDelay = 5000; // 5 segundos
  
  // Iconos
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  
  // Estados
  isLoading = false;
  error: string | null = null;

  private resizeListener: (() => void) | null = null;
  private cardWidth = 280; // Ancho aproximado de cada tarjeta + gap
  private minItemsPerView = 1;

  ngOnInit() {
    console.log('🎠 Iniciando CarruselFull...');
    console.log('📊 Productos recibidos:', this.productos.length);
    
    if (!this.productos || this.productos.length === 0) {
      console.warn('⚠️ No hay productos para mostrar');
    }
    
    this.updateItemsPerView();
    this.resizeListener = () => {
      this.updateItemsPerView();
      this.calculateDimensions();
    };
    window.addEventListener('resize', this.resizeListener);
    
    // Iniciar autoplay
    this.startAutoPlay();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.calculateDimensions();
      this.updateTrackPosition();
    }, 100);
  }

  ngOnDestroy() {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
    // Detener autoplay
    this.stopAutoPlay();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateItemsPerView();
    this.calculateDimensions();
  }

  private calculateDimensions() {
    if (!this.carouselContent?.nativeElement || this.productos.length === 0) return;
    
    const container = this.carouselContent.nativeElement;
    const containerWidth = container.clientWidth;
    
    // Calcular cuántas cards caben
    const availableWidth = containerWidth - 48; // Restar padding (24px * 2)
    this.itemsPerView = Math.max(this.minItemsPerView, Math.floor(availableWidth / this.cardWidth));
    
    // Calcular ancho real de cada slide
    this.slideWidth = 100 / this.itemsPerView;
    this.totalWidth = this.productos.length * this.slideWidth;
    
    console.log(`📐 Dimensiones calculadas: itemsPerView=${this.itemsPerView}, slideWidth=${this.slideWidth}%`);
  }

  updateItemsPerView() {
    const width = window.innerWidth;
    let newItemsPerView = 4;
    
    if (width >= 1200) {
      newItemsPerView = 4;
    } else if (width >= 992) {
      newItemsPerView = 3;
    } else if (width >= 768) {
      newItemsPerView = 2;
    } else {
      newItemsPerView = 1;
    }
    
    // Solo actualizar si cambió
    if (newItemsPerView !== this.itemsPerView) {
      this.itemsPerView = newItemsPerView;
      this.slideWidth = 100 / this.itemsPerView;
      this.totalWidth = this.productos.length * this.slideWidth;
      this.validateCurrentIndex();
      console.log(`📐 Items por vista actualizado a: ${this.itemsPerView} (ancho: ${width}px)`);
    }
  }

  private validateCurrentIndex() {
    if (this.productos.length <= this.itemsPerView) {
      this.currentIndex = 0;
    } else {
      const maxIndex = this.productos.length - this.itemsPerView;
      if (this.currentIndex > maxIndex) {
        this.currentIndex = maxIndex;
      }
    }
  }

  get visibleProductos(): Producto[] {
    if (!this.productos || this.productos.length === 0) {
      return [];
    }
    
    // Si hay pocos productos, mostrar todos
    if (this.productos.length <= this.itemsPerView) {
      return this.productos;
    }
    
    // Mostrar productos desde currentIndex
    return this.productos.slice(this.currentIndex, this.currentIndex + this.itemsPerView);
  }

  get totalSlides(): number {
    if (!this.productos || this.productos.length === 0) {
      return 0;
    }
    
    if (this.productos.length <= this.itemsPerView) {
      return 1;
    }
    
    return Math.ceil(this.productos.length / this.itemsPerView);
  }

  get currentSlide(): number {
    if (this.productos.length <= this.itemsPerView) {
      return 1;
    }
    return Math.floor(this.currentIndex / this.itemsPerView) + 1;
  }

  get isPrevDisabled(): boolean {
    if (!this.productos || this.productos.length === 0) {
      return true;
    }
    return this.currentIndex === 0 || this.productos.length <= this.itemsPerView;
  }

  get isNextDisabled(): boolean {
    if (!this.productos || this.productos.length === 0) {
      return true;
    }
    
    if (this.productos.length <= this.itemsPerView) {
      return true;
    }
    
    return this.currentIndex >= this.productos.length - this.itemsPerView;
  }

  async anterior() {
    if (this.isPrevDisabled || this.isAnimating) {
      return;
    }
    
    // Reiniciar autoplay cuando el usuario interactúa
    this.restartAutoPlay();
    
    this.isAnimating = true;
    
    // Verificar límites
    const newIndex = Math.max(0, this.currentIndex - this.itemsPerView);
    
    if (newIndex !== this.currentIndex) {
      this.currentIndex = newIndex;
      console.log(`⬅️ Navegando anterior. Índice actual: ${this.currentIndex}`);
      
      // Pequeña pausa para que Angular actualice la vista
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    // Fin de animación
    setTimeout(() => {
      this.isAnimating = false;
    }, 800); // Duración de la animación CSS
  }

  async siguiente() {
    if (this.isNextDisabled || this.isAnimating) {
      return;
    }
    
    // Reiniciar autoplay cuando el usuario interactúa
    this.restartAutoPlay();
    
    this.isAnimating = true;
    
    // Verificar límites
    const maxIndex = this.productos.length - this.itemsPerView;
    const newIndex = Math.min(maxIndex, this.currentIndex + this.itemsPerView);
    
    if (newIndex !== this.currentIndex) {
      this.currentIndex = newIndex;
      console.log(`➡️ Navegando siguiente. Índice actual: ${this.currentIndex}`);
      
      // Pequeña pausa para que Angular actualice la vista
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    // Fin de animación
    setTimeout(() => {
      this.isAnimating = false;
    }, 800); // Duración de la animación CSS
  }

  async irASlide(slide: number) {
    if (this.isAnimating || slide < 1 || slide > this.totalSlides) {
      return;
    }
    
    this.isAnimating = true;
    
    if (this.productos.length <= this.itemsPerView) {
      this.currentIndex = 0;
    } else {
      const newIndex = (slide - 1) * this.itemsPerView;
      const maxIndex = this.productos.length - this.itemsPerView;
      this.currentIndex = Math.min(newIndex, maxIndex);
    }
    
    console.log(`🔢 Saltando a slide ${slide}. Índice: ${this.currentIndex}`);
    
    // Pequeña pausa para que Angular actualice la vista
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Fin de animación
    setTimeout(() => {
      this.isAnimating = false;
    }, 800);
  }

  getCardTransform(index: number): string {
    // Si hay pocos productos, mostrarlos sin transformación
    if (this.productos.length <= this.itemsPerView) {
      return 'translateX(0) scale(1)';
    }
    
    // Calcula la posición relativa al viewport actual
    const position = index - this.currentIndex;
    
    // Si está en el rango visible, mostrar normal
    if (position >= 0 && position < this.itemsPerView) {
      return 'translateX(0) scale(1)';
    }
    
    // Si está fuera de vista, esconder a la derecha
    if (position >= this.itemsPerView) {
      return 'translateX(100%) scale(0.95)';
    }
    
    // Si está antes de la vista, esconder a la izquierda
    return 'translateX(-100%) scale(0.95)';
  }

  getCardOpacity(index: number): number {
    // Si hay pocos productos, mostrar todos
    if (this.productos.length <= this.itemsPerView) {
      return 1;
    }
    
    // Calcula la posición relativa al viewport actual
    const position = index - this.currentIndex;
    
    // Si está en el rango visible, opacidad total
    if (position >= 0 && position < this.itemsPerView) {
      return 1;
    }
    
    // Si está fuera de vista, opacidad cero
    return 0;
  }

  getTrackTransform(): string {
    // Si hay pocos productos, centrarlos
    if (this.productos.length <= this.itemsPerView) {
      const totalCardsWidth = this.productos.length * 100;
      const containerWidth = this.itemsPerView * 100;
      const offset = (containerWidth - totalCardsWidth) / (2 * this.itemsPerView);
      return `translateX(${offset}%)`;
    }
    
    // Para el track completo, moverlo según currentIndex
    const translateX = -(this.currentIndex * (100 / this.itemsPerView));
    return `translateX(${translateX}%)`;
  }

  updateTrackPosition() {
    // Este método sería llamado después de cambiar currentIndex
    // Pero la transformación se maneja con CSS mediante [style.transform]
  }

  formatearPrecio(precio: any): string {
    try {
      const num = typeof precio === 'string' ? parseFloat(precio) : precio;
      if (isNaN(num)) {
        return '$0.00';
      }
      return '$' + num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } catch (error) {
      console.error('Error formateando precio:', error);
      return '$0';
    }
  }

  getProductoImagen(producto: Producto): string {
    if (producto.imagenes && producto.imagenes.length > 0 && producto.imagenes[0]) {
      return producto.imagenes[0];
    }
    return '';
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    
    // Mostrar placeholder
    const parent = img.parentElement;
    if (parent) {
      const placeholder = document.createElement('div');
      placeholder.className = 'sin-imagen';
      placeholder.textContent = '📦';
      parent.appendChild(placeholder);
    }
  }

  // Método para debugging
  debugInfo(): void {
    console.log('=== DEBUG CARRUSEL ===');
    console.log('Productos totales:', this.productos.length);
    console.log('Items por vista:', this.itemsPerView);
    console.log('Current Index:', this.currentIndex);
    console.log('Current Slide:', this.currentSlide);
    console.log('Total Slides:', this.totalSlides);
    console.log('Visible productos:', this.visibleProductos.length);
    console.log('isPrevDisabled:', this.isPrevDisabled);
    console.log('isNextDisabled:', this.isNextDisabled);
    console.log('isAnimating:', this.isAnimating);
    console.log('=====================');
  }

  startAutoPlay(): void {
    // No iniciar autoplay si hay muy pocos productos
    if (this.productos.length <= this.itemsPerView) {
      return;
    }

    this.autoPlayInterval = setInterval(async () => {
      // Si llegó al final, volver al inicio
      if (this.currentIndex >= this.productos.length - this.itemsPerView) {
        this.currentIndex = 0;
      } else {
        // Avanzar un elemento
        this.currentIndex += this.itemsPerView;
      }
      console.log(`⏱️ AutoPlay - Índice: ${this.currentIndex}`);
    }, this.autoPlayDelay);

    console.log('▶️ AutoPlay iniciado');
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
      console.log('⏹️ AutoPlay detenido');
    }
  }

  restartAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
    console.log('🔄 AutoPlay reiniciado');
  }
}