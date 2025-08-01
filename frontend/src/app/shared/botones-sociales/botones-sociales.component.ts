import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-redes-sociales',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './botones-sociales.component.html',
  styleUrls: ['./botones-sociales.component.css']
})
export class RedesSocialesComponent {
  constructor(library: FaIconLibrary) {
    library.addIcons(faFacebookF, faInstagram, faWhatsapp);
  }
}
