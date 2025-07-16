import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faWhatsapp, faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-whatsapp',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css']
})
export class WhatsappComponent {
  constructor(library: FaIconLibrary) {
    library.addIcons(faWhatsapp, faInstagram, faFacebook, faTiktok);
  }
}
