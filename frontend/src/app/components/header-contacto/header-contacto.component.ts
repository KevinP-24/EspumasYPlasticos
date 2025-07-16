import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faEnvelope,
  faPhone,
  faCommentDots
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header-contacto',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './header-contacto.component.html',
  styleUrls: ['./header-contacto.component.css']
})
export class HeaderContactoComponent {
  constructor(library: FaIconLibrary) {
    library.addIcons(faEnvelope, faPhone, faCommentDots);
  }
}
