import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDTO } from '../../models/auth/login.dto';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login-component',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule]
})
export class LoginComponent {
  dto = new LoginDTO(); // Usa el DTO
  error = '';

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.getToken()) {
      this.router.navigate(['/admin']);
    }
  }
    login(): void {
    this.error = '';

    const correoVacio = this.dto.correo.trim() === '';
    const passwordVacio = this.dto.password.trim() === '';

    if (correoVacio && passwordVacio) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Por favor ingresa el correo y la contraseña'
      });
      return;
    }

    if (correoVacio) {
      Swal.fire({
        icon: 'warning',
        title: 'Correo requerido',
        text: 'Debes ingresar tu correo electrónico'
      });
      return;
    }

    if (passwordVacio) {
      Swal.fire({
        icon: 'warning',
        title: 'Contraseña requerida',
        text: 'Debes ingresar tu contraseña'
      });
      return;
    }

    // ✅ Mostrar cargando
    Swal.fire({
      title: 'Iniciando sesión...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.auth.login(this.dto).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        Swal.close(); // Cierra el loading
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.error || 'Error al iniciar sesión'
        });
      }
    });
  }
}
