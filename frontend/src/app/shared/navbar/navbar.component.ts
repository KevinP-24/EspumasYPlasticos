import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faKey, faMapMarkerAlt, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  faKey = faKey;
  faMapMarkerAlt = faMapMarkerAlt;
  faMagnifyingGlass = faMagnifyingGlass;
  logoHover = false;
  menuAbierto = false;
  scrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Cambia el estado cuando se hace scroll (más de 10px)
    this.scrolled = window.scrollY > 10;
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }
}