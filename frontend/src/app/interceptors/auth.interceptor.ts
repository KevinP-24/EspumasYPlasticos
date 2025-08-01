import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

let alertaMostrada = false; // 🔐 Bandera de control

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('token');
  const clonedReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  const router = inject(Router);
  const alertService = inject(AlertService);

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const mensaje = error.error?.error?.toLowerCase?.() || '';

      const sesionExpirada =
        error.status === 401 || (error.status === 403 && mensaje.includes('token'));

      if (sesionExpirada && !alertaMostrada) {
        alertaMostrada = true;

        alertService.sesionExpirada().then(() => {
          alertaMostrada = false; // 🔁 Resetea la bandera después de cerrar
          localStorage.removeItem('token');
          router.navigate(['/login']);
        });
      }

      return throwError(() => error);
    })
  );
};
