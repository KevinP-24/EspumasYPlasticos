import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  // Información de contacto
  emails = {
    principal: 'espumasyplasticos.sas@gmail.com',
    compras: 'comprasespumasyplasticos.sas@gmail.com',
    ventas: 'ventasespumasyplasticos.sas@gmail.com'
  };

  telefonos = {
    movil: '+573113416659',
    fijo: '606-7312577'
  };
}
