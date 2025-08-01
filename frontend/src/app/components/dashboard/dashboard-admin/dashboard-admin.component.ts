import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket, faGaugeHigh } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-admin-component',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {
  faLogout = faRightFromBracket;
  faPanel = faGaugeHigh;

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
