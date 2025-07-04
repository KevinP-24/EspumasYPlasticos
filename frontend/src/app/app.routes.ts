import { Routes } from '@angular/router';
//import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'productos',
    loadComponent: () => import('./pages/productos/productos').then(m => m.Productos)
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./pages/nosotros/nosotros').then(m => m.Nosotros)
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto/contacto').then(m => m.Contacto)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

