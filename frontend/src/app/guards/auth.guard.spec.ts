import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // 🔧 Creamos un espía de Router para interceptar parseUrl
    routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);

    // 🔧 Configuramos el módulo de pruebas con el guard y el Router espiado
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy }
      ]
    });

    // 🚀 Obtenemos la instancia real del guard desde el injector
    guard = TestBed.inject(AuthGuard);
  });

  it('✅ debe permitir acceso si hay token', () => {
    // Simulamos que localStorage tiene un token
    spyOn(localStorage, 'getItem').and.returnValue('fake-token');

    const result = guard.canActivate({} as any, {} as any);
    expect(result).toBeTrue(); // ✅ Acceso permitido
  });

  it('🚫 debe redirigir al login si NO hay token', () => {
    // Simulamos que localStorage NO tiene token
    spyOn(localStorage, 'getItem').and.returnValue(null);

    guard.canActivate({} as any, {} as any);

    // ✅ Verificamos que redirige a /login
    expect(routerSpy.parseUrl).toHaveBeenCalledWith('/login');
  });
});
