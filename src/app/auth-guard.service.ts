import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { SQLiteService } from './services/DB/sql-lite.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private db: SQLiteService) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    // Profe, aca utilice localestorage ya que no hay una forma tan directa de asociar la db con el authguard
    const username = localStorage.getItem('loggedUser');
    const password = localStorage.getItem('loggedPass');
    if (!username || !password) {
      this.router.navigate(['/login']);
      return false;
    }
    // Validar en la base de datos
    const usuarioExiste = await this.db.existeUsuario(username, password);
    if (!usuarioExiste) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
