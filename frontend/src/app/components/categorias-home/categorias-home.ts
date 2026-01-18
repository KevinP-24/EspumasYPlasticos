import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface Categoria {
  nombre: string;
  imagen: string;
}

@Component({
  selector: 'app-categorias-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './categorias-home.html',
  styleUrl: './categorias-home.css'
})
export class CategoriasHome implements OnInit, OnDestroy, AfterViewInit {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  @ViewChild('categoriasTrack', { static: false }) categoriasTrack!: ElementRef;
  @ViewChild('categoriasContent', { static: false }) categoriasContent!: ElementRef;

  categorias: Categoria[] = [
    {
      nombre: 'Colchones',
      imagen: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1768714513/colchones_un8rze.jpg'
    },
    {
      nombre: 'Almohadas',
      imagen: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1768714512/almohadas_xsghon.jpg'
    },
    {
      nombre: 'Alcobas',
      imagen: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1768714512/alcobas_lujv4f.jpg'
    },
    {
      nombre: 'Cojinerías',
      imagen: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1768714512/cojinerias_umwipn.jpg'
    },
    {
      nombre: 'Telas',
      imagen: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1768714513/telas_t6ylvp.jpg'
    },
    {
      nombre: 'Camping',
      imagen: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1768714512/camping_xgkqzm.jpg'
    },
    {
      nombre: 'Baby',
      imagen: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1768535114/WhatsApp_Image_2026-01-15_at_10.44.22_PM_ugjtjb.jpg'
    }
  ];

  currentIndex = 0;
  itemsPerView = 7;
  isAnimating = false;
  isDragging = false;
  dragStartX = 0;
  dragCurrentX = 0;
  dragThreshold = 30;
  momentum = 0;
  lastDragTime = 0;
  transitionDuration = 400;

  private resizeListener: (() => void) | null = null;
  private rafId: number | null = null;
  private lastWheelTime = 0;
  private wheelDelta = 0;

  ngOnInit() {
    this.updateItemsPerView();
    this.resizeListener = () => {
      requestAnimationFrame(() => {
        this.updateItemsPerView();
        this.updateTrackPosition();
      });
    };
    window.addEventListener('resize', this.resizeListener);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateItemsPerView();
      this.updateTrackPosition();
    }, 100);
  }

  ngOnDestroy() {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    requestAnimationFrame(() => {
      this.updateItemsPerView();
      this.updateTrackPosition();
    });
  }

  // Scroll horizontal con rueda del mouse
  onWheel(event: WheelEvent) {
    if (this.categorias.length <= this.itemsPerView || this.isAnimating) return;
    
    if (event.deltaX === 0) return;
    
    event.preventDefault();
    
    const now = Date.now();
    const timeDiff = now - this.lastWheelTime;
    
    if (timeDiff < 50) {
      this.wheelDelta += event.deltaX;
    } else {
      this.wheelDelta = event.deltaX;
    }
    
    this.lastWheelTime = now;
    
    const direction = this.wheelDelta > 0 ? 1 : -1;
    
    if (Math.abs(this.wheelDelta) > 10) {
      this.move(direction);
      this.wheelDelta = 0;
    }
    
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    
    this.rafId = requestAnimationFrame(() => {
      this.wheelDelta *= 0.8;
      if (Math.abs(this.wheelDelta) < 0.1) {
        this.wheelDelta = 0;
      }
    });
  }

  // Drag & Drop
  startDrag(event: MouseEvent | TouchEvent) {
    if (this.isAnimating) return;
    
    this.isDragging = true;
    this.momentum = 0;
    this.lastDragTime = Date.now();
    
    const clientX = this.getClientX(event);
    this.dragStartX = clientX;
    this.dragCurrentX = clientX;
    
    if (this.categoriasTrack?.nativeElement) {
      this.categoriasTrack.nativeElement.style.transition = 'none';
    }
  }

  onDrag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging || this.isAnimating) return;
    
    const now = Date.now();
    const timeDiff = now - this.lastDragTime;
    this.lastDragTime = now;
    
    const clientX = this.getClientX(event);
    const delta = clientX - this.dragCurrentX;
    
    if (timeDiff > 0) {
      const velocity = delta / timeDiff;
      this.momentum = velocity * 0.8;
    }
    
    this.dragCurrentX = clientX;
    this.updateTrackPosition();
    
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.rafId = requestAnimationFrame(() => {});
  }

  endDrag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    
    if (this.categoriasTrack?.nativeElement) {
      this.categoriasTrack.nativeElement.style.transition = `transform ${this.transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    }
    
    const diff = this.dragStartX - this.dragCurrentX;
    const absDiff = Math.abs(diff);
    
    if (Math.abs(this.momentum) > 0.1 && absDiff > 20) {
      const direction = this.momentum > 0 ? -1 : 1;
      const momentumSteps = Math.min(Math.floor(Math.abs(this.momentum) * 100), 3);
      
      for (let i = 0; i < momentumSteps; i++) {
        setTimeout(() => {
          this.move(direction);
        }, i * 50);
      }
    } else if (absDiff > this.dragThreshold) {
      const direction = diff > 0 ? -1 : 1;
      this.move(direction);
    } else {
      this.updateTrackPosition();
    }
  }

  private getClientX(event: MouseEvent | TouchEvent): number {
    if ('touches' in event && event.touches.length > 0) {
      return event.touches[0].clientX;
    }
    return (event as MouseEvent).clientX;
  }

  move(direction: number): void {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    
    const newIndex = this.currentIndex + direction;
    
    if (newIndex < 0 || newIndex > this.categorias.length - this.itemsPerView) {
      this.isAnimating = false;
      return;
    }
    
    this.currentIndex = newIndex;
    this.updateTrackPosition();
    
    setTimeout(() => {
      this.isAnimating = false;
    }, this.transitionDuration);
  }

  updateItemsPerView() {
    const width = window.innerWidth;
    let newItemsPerView = 7;
    
    if (width >= 1600) {
      newItemsPerView = 7;
    } else if (width >= 1400) {
      newItemsPerView = 6;
    } else if (width >= 1200) {
      newItemsPerView = 5;
    } else if (width >= 992) {
      newItemsPerView = 4;
    } else if (width >= 768) {
      newItemsPerView = 3;
    } else if (width >= 480) {
      newItemsPerView = 2;
    } else {
      newItemsPerView = 1;
    }
    
    if (newItemsPerView !== this.itemsPerView) {
      this.itemsPerView = newItemsPerView;
      
      if (this.currentIndex > this.categorias.length - this.itemsPerView) {
        this.currentIndex = Math.max(0, this.categorias.length - this.itemsPerView);
      }
    }
  }

  get isPrevDisabled(): boolean {
    return this.currentIndex === 0 || this.categorias.length <= this.itemsPerView;
  }

  get isNextDisabled(): boolean {
    return this.currentIndex >= this.categorias.length - this.itemsPerView;
  }

  anterior() {
    this.move(-1);
  }

  siguiente() {
    this.move(1);
  }

  updateTrackPosition() {
    if (!this.categoriasTrack?.nativeElement || this.categorias.length === 0) return;
    
    const track = this.categoriasTrack.nativeElement;
    
    if (this.categorias.length <= this.itemsPerView) {
      const totalCardsWidth = this.categorias.length * 100;
      const containerWidth = this.itemsPerView * 100;
      const offset = (containerWidth - totalCardsWidth) / (2 * this.itemsPerView);
      track.style.transform = `translateX(${offset}%)`;
    } else if (this.isDragging) {
      const diff = this.dragStartX - this.dragCurrentX;
      const trackWidth = track.scrollWidth;
      const contentWidth = this.categoriasContent?.nativeElement?.clientWidth || trackWidth;
      const dragPercent = (diff / contentWidth) * 100;
      const baseTranslate = -(this.currentIndex * (100 / this.itemsPerView));
      track.style.transform = `translateX(${baseTranslate + dragPercent}%)`;
    } else {
      const translateX = -(this.currentIndex * (100 / this.itemsPerView));
      track.style.transform = `translateX(${translateX}%)`;
    }
  }

  getTrackTransform(): string {
    if (this.categorias.length <= this.itemsPerView) {
      const totalCardsWidth = this.categorias.length * 100;
      const containerWidth = this.itemsPerView * 100;
      const offset = (containerWidth - totalCardsWidth) / (2 * this.itemsPerView);
      return `translateX(${offset}%)`;
    }
    
    const translateX = -(this.currentIndex * (100 / this.itemsPerView));
    return `translateX(${translateX}%)`;
  }

  selectCategoria(categoria: Categoria) {
    console.log('Categoría seleccionada:', categoria);
  }
}
