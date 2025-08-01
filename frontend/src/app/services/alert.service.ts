import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  // ----- Alertas LOGIN -----
  mostrarCargandoLogin(): void {
    Swal.fire({
      title: 'Iniciando sesión...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });
  }

  mostrarExitoLogin(): void {
    Swal.fire({
      icon: 'success',
      title: '¡Bienvenido!',
      text: 'Cargando tu panel de administración...',
      showConfirmButton: false,
      timer: 1500
    }); 
  }

  sesionExpirada(): Promise<any> {
    return Swal.fire({
      icon: 'warning',
      title: 'Sesión expirada',
      text: 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#009AA2'
    });
  }

  confirmarLogout(): Promise<any> {
    return Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Se cerrará tu sesión actual.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#9EA0A3'
    });
  }

  mostrarLogoutExitoso(): void {
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente.',
      showConfirmButton: false,
      timer: 1500
    });
  }

  datosIncompletos(campo: 'correo' | 'password' | 'ambos'): void {
    let mensaje = '';
    if (campo === 'ambos') {
      mensaje = 'Por favor ingresa el correo y la contraseña';
    } else if (campo === 'correo') {
      mensaje = 'Debes ingresar tu correo electrónico';
    } else if (campo === 'password') {
      mensaje = 'Debes ingresar tu contraseña';
    }

    Swal.fire({
      icon: 'warning',
      title: 'Campos requeridos',
      text: mensaje
    });
  }

  credencialesInvalidas(): void {
    Swal.fire({
      icon: 'error',
      title: 'Credenciales inválidas',
      text: 'Correo o contraseña incorrectos'
    });
  }

  // ----- Alertas CATEGORÍAS -----
  // Crear / Actualizar
  mostrarExito(mensaje: string, titulo = 'Operación exitosa') {
    return Swal.fire({
      icon: 'success',
      title: titulo,
      text: mensaje,
      confirmButtonColor: '#009AA2'
    });
  }

  mostrarError(mensaje: string, titulo = 'Error') {
    return Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
      confirmButtonColor: '#009AA2'
    });
  }

  // Confirmación eliminación
  confirmarEliminacion(nombre = 'la categoría'): Promise<any> {
    return Swal.fire({
      title: `¿Eliminar ${nombre}?`,
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#9EA0A3',
      confirmButtonText: 'Sí, eliminar'
    });
  }
}
