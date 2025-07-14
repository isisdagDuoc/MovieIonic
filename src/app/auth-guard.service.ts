import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from './services/dataservice.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private ds: DataService) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    console.log(
      'LocalStorage:',
      localStorage.getItem('loggedUser'),
      localStorage.getItem('loggedPass')
    );

    const username = localStorage.getItem('loggedUser');
    const password = localStorage.getItem('loggedPass');

    if (!username || !password) {
      console.warn(
        '[AuthGuard] Usuario o contraseña no encontrados en LocalStorage'
      );
      this.router.navigate(['/login']);
      return false;
    }

    await this.ds.init();
    const usuarioExiste = await this.ds.obtenerUsuario(username, password);

    if (!usuarioExiste) {
      console.warn('[AuthGuard] Usuario no encontrado en DB o Storage');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
