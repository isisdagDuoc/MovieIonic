import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SQLiteService } from './DB/sql-lite.service';
import { StorageService } from './Storage/storage.service';
import { Usuario } from './DB/models/usuario';
import { PeliculaCatalogo } from './DB/models/pelicula-catalogo';

@Injectable({ providedIn: 'root' })
export class DataService {
  private isNative = Capacitor.isNativePlatform();
  private dbReady = false;

  constructor(private db: SQLiteService, private storage: StorageService) {}

  async init() {
    if (!this.isNative) {
      await this.storage.init();
      this.dbReady = true;
    } else {
      this.db.dbState().subscribe((ready) => (this.dbReady = ready));
    }
  }

  isReady() {
    return this.dbReady;
  }

  async esperarDBLista(): Promise<void> {
    if (this.dbReady) return;

    return new Promise((resolve) => {
      const sub = this.db.dbState().subscribe((ready) => {
        if (ready) {
          sub.unsubscribe();
          this.dbReady = true;
          resolve();
        }
      });
    });
  }

  async obtenerUsuario(email: string, pass: string): Promise<Usuario | null> {
    return this.isNative
      ? this.db.obtenerUsuario(email, pass)
      : this.storage.getUsuario(email, pass);
  }

  async agregarUsuario(usuario: Usuario): Promise<boolean> {
    if (this.isNative) {
      await this.esperarDBLista();
      return this.db.agregarUsuario(usuario);
    } else {
      await this.storage.set('usuario_' + usuario.email, usuario);
      return true;
    }
  }

  async agregarPeliculasAUsuario(
    userId: number,
    peliculas: PeliculaCatalogo[]
  ) {
    return this.isNative
      ? Promise.all(
          peliculas.map((p) => this.db.agregarPeliculaAlUsuario(userId, p.id))
        ).then(() => true)
      : this.storage.addPeliculasToUsuario(userId, peliculas).then(() => true);
  }

  async obtenerPeliculasDeUsuario(userId: number): Promise<PeliculaCatalogo[]> {
    if (this.isNative) {
      const peliculasDB = await this.db.obtenerPeliculasDeUsuario(userId);

      if (peliculasDB && Array.isArray(peliculasDB) && peliculasDB.length > 0) {
        return peliculasDB;
      } 
      
      return [];
    } else {
      return this.storage.getPeliculasDeUsuario(userId);
    }
  }

  async obtenerDirectores(): Promise<any[]> {
    return this.isNative
      ? this.db.obtenerDirectores()
      : this.storage.getDirectores();
  }

  async obtenerComentarios(): Promise<any[]> {
    return this.isNative
      ? this.db.obtenerComentarios()
      : this.storage.getComentarios();
  }

  async obtenerUsuarios(): Promise<Usuario[]> {
    if (this.isNative) {
      return this.db.obtenerUsuarios();
    } else {
      const allKeys = await this.storage.getKeys?.();
      const userKeys = allKeys.filter((key: string) =>
        key.startsWith('usuario_')
      );

      const usuarios: Usuario[] = [];
      for (const key of userKeys) {
        const user = await this.storage.get(key);
        if (user) usuarios.push(user);
      }

      return usuarios;
    }
  }

  async obtenerPeliculasCatalogo(): Promise<PeliculaCatalogo[]> {
    return this.isNative
      ? this.db.obtenerPeliculasCatalogo()
      : this.storage.getPeliculasCatalogo();
  }
}
