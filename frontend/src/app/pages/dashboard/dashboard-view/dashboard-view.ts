import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardViewComponentComponent } from "../../../components/dashboard/dashboard-view-component/dashboard-view-component.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardViewComponentComponent],
  templateUrl: './dashboard-view.html',
  styleUrl: './dashboard-view.css'
})
export class Dashboard {

}
