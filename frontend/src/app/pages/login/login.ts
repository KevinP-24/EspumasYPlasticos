import { Component } from '@angular/core';
import { LoginComponent } from "../../components/login-component/login.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    LoginComponent],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

}
