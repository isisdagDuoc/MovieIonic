import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Comentario } from './models/comentario';
import { Director } from './models/director';
import { PeliculaCatalogo } from './models/pelicula-catalogo';
import { Pelicula } from './models/pelicula';
import { Usuario } from './models/usuario';

@Injectable({
  providedIn: 'root',
})
export class SQLiteService {
  private database: SQLiteObject | null = null;
  private dbLista: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.crearBD();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite
        .create({
          name: 'movieonic.db',
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          this.database = db;
          console.log('BD Creada');
          this.crearTabla();
          this.dbLista.next(true);
        })
        .catch((e) => {
          this.dbLista.next(false);
          console.log('Error al crear DB: ' + e);
        });
    });
  }

  dbState() {
    return this.dbLista;
  }

  async crearTabla() {
    if (this.database != null) {
      try {
      
        /*
        await this.database.executeSql('DELETE FROM pelicula;', []);
        await this.database.executeSql('DELETE FROM pelicula_catalogo;', []);
        await this.database.executeSql('DELETE FROM usuario;', []);
        await this.database.executeSql('DELETE FROM director;', []);
        await this.database.executeSql('DELETE FROM comentario;', []);
        */

        // ──────────────── CATALOGO DE PELICULAS ─────────────────
        await this.database.executeSql(
          `CREATE TABLE IF NOT EXISTS pelicula_catalogo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            year INTEGER,
            rating REAL,
            genre TEXT,
            image TEXT,
            directorId INTEGER
          );`,
          []
        );

        await this.database.executeSql(
          `INSERT OR IGNORE INTO pelicula_catalogo (id, title, year, rating, genre, image, directorId) VALUES
            (1, 'Inception', 2010, 8.8, 'Ciencia Ficción', 'inception.jpg', 1),
            (2, 'The Matrix', 1999, 8.7, 'Ciencia Ficción', 'matrix.jpg', 2),
            (3, 'Interstellar', 2014, 8.6, 'Ciencia Ficción', 'interstellar.jpg', 1),
            (4, 'Orgullo y Prejuicio', 2005, 8.6, 'Romance', 'orgullo.jpg', 5),
            (5, 'Jurassic Park', 1993, 8.1, 'Aventura', 'jurassic.jpg', 4),
            (6, 'Goodfellas', 1990, 8.7, 'Crimen', 'goodfellas.jpg', 5),
            (7, 'Pulp Fiction', 1994, 8.9, 'Crimen', 'pulp.jpg', 6),
            (8, 'The Wolf of Wall Street', 2013, 8.2, 'Comedia', 'wolf.jpg', 5),
            (9, 'The Shawshank Redemption', 1994, 9.3, 'Drama', 'shawshank.jpg', 5),
            (10, 'The Godfather', 1972, 9.2, 'Crimen', 'godfather.jpg', 5),
            (11, 'Schindlers List', 1993, 9.0, 'Drama', 'schindler.jpg', 4),
            (12, 'The Dark Knight', 2008, 9.0, 'Acción', 'dark-knight.jpg', 1),
            (13, 'Forrest Gump', 1994, 8.8, 'Drama', 'forrest-gump.jpg', 5)
          ;`,
          []
        );

        // ──────────────── USUARIOS ─────────────────
        await this.database.executeSql(
          `CREATE TABLE IF NOT EXISTS usuario (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT,
          password TEXT
        );`,
          []
        );

        await this.database.executeSql(
          `INSERT OR IGNORE INTO usuario (id, name, email, password) VALUES 
        (1, 'Alice', 'test@gmail.com', '1234'),
        (2, 'isis', 'isis@gmail.com', '1234');`,
          []
        );

        // ──────────────── DIRECTORES ─────────────────
        await this.database.executeSql(
          `CREATE TABLE IF NOT EXISTS director (
          id INTEGER PRIMARY KEY,
          name TEXT,
          birthYear INTEGER,
          nationality TEXT,
          image TEXT
        );`,
          []
        );

        await this.database.executeSql(
          `INSERT OR IGNORE INTO director (id, name, birthYear, nationality, image) VALUES 
        (1, 'Christopher Nolan', 1970, 'British-American', 'nolan.jpg'),
        (2, 'Lana Wachowski', 1965, 'American', 'lana.jpg'),
        (3, 'Lilly Wachowski', 1967, 'American', 'lili.jpg'),
        (4, 'Steven Spielberg', 1946, 'American', 'spielberg.jpg'),
        (5, 'Martin Scorsese', 1942, 'American', 'martin-scorsese.jpg'),
        (6, 'Quentin Tarantino', 1963, 'American', 'tarantino.jpg'),
        (7, 'Joe Wright', 1972, 'British', 'joe-wright.jpg'),
        (8, 'Ridley Scott', 1937, 'British', 'ridley-scott.jpg'),
        (9, 'Francis Ford Coppola', 1939, 'American', 'coppola.jpg'),
        (10, 'Peter Jackson', 1961, 'New Zealander', 'peter-jackson.jpg'),
        (11, 'James Cameron', 1954, 'Canadian', 'james-cameron.jpg')
        ;`,
          []
        );

        // ──────────────── PELICULAS FAVORITAS DE USUARIO ─────────────────
        await this.database.executeSql(
          `CREATE TABLE IF NOT EXISTS pelicula (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            catalogoId INTEGER,
            FOREIGN KEY (userId) REFERENCES usuario(id),
            FOREIGN KEY (catalogoId) REFERENCES pelicula_catalogo(id)
          );`,
          []
        );

        // ──────────────── COMENTARIOS ─────────────────
        await this.database.executeSql(
          `CREATE TABLE IF NOT EXISTS comentario (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER,
          name TEXT,
          text TEXT,
          FOREIGN KEY (userId) REFERENCES usuario(id)
        );`,
          []
        );

        await this.database.executeSql(
          `INSERT OR IGNORE INTO comentario (userId, name, text) VALUES 
        (1, 'Alice', 'Orgullo y Prejuicio es una película hermosa, con una historia de amor conmovedora.'),
        (2, 'isis', 'Jurassic Park es un clásico de la ciencia ficción, ¡me encanta!'),
        (1, 'Alice', 'Inception es una obra maestra de Christopher Nolan, ¡me dejó sin aliento!'),
        (2, 'isis', 'The Matrix cambió mi forma de ver el cine, ¡es increíble!'),
        (1, 'Alice', 'Pulp Fiction es una película icónica, ¡me encanta la narrativa no lineal!'),
        (2, 'isis', 'Goodfellas es una obra maestra del cine de crimen, ¡la actuación es impresionante!'),
        (1, 'Alice', 'Interstellar es una experiencia visual y emocional única, ¡me hizo reflexionar sobre el tiempo y el amor!'),
        (2, 'isis', 'The Wolf of Wall Street es una película divertida y provocativa, ¡Leonardo DiCaprio está increíble!');`,
          []
        );

        this.dbLista.next(true);
      } catch (error) {
        console.error('Error al crear o poblar tablas:', JSON.stringify(error));
        this.dbLista.next(false);
      }
    } else {
      console.error('Error al crear o poblar tablas: NEXT');
      this.dbLista.next(false);
    }
  }

  async obtenerTexto() {
    if (this.database != null) {
      let res = await this.database.executeSql(`SELECT * FROM datos;`, []);

      if (res.rows.length > 0) return res.rows.item(0).texto;
    }

    return 'No hay datos';
  }

  async agregarUsuario(usuario: Usuario): Promise<boolean> {
    if (!this.database) return false;

    try {
      const result = await this.database.executeSql(
        `INSERT INTO usuario (name, email, password) VALUES (?, ?, ?);`,
        [usuario.name, usuario.email, usuario.password]
      );

      const userId = result.insertId;

      if (usuario.peliculas && usuario.peliculas.length > 0) {
        for (const pelicula of usuario.peliculas) {
          await this.database.executeSql(
            `INSERT INTO pelicula (userId, catalogoId) VALUES (?, ?);`,
            [userId, pelicula.id]
          );
        }
      }
      return true;
    } catch (error) {
      console.error('Error al agregar usuario con películas:', error);
      return false;
    }
  }

  async obtenerUsuarios(): Promise<any[]> {
    if (!this.database) return [];

    try {
      const res = await this.database.executeSql(`SELECT * FROM usuario;`, []);

      const usuarios = [];
      for (let i = 0; i < res.rows.length; i++) {
        usuarios.push(res.rows.item(i));
      }
      return usuarios;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return [];
    }
  }

  async existeUsuario(username: string, pass: string) {
    if (this.database != null) {
      try {
        let res = await this.database.executeSql(
          `SELECT * FROM usuario WHERE name = ? AND password = ?;`,
          [username, pass]
        );
        if (res.rows.length > 0) return true;
      } catch (error) {
        console.error('Error en existeUsuario:', error);
      }
    }
    return false;
  }

  async obtenerUsuario(
    email: string,
    password: string
  ): Promise<Usuario | null> {
    if (!this.database) return null;

    try {
      const res = await this.database.executeSql(
        `SELECT * FROM usuario WHERE email = ? AND password = ?;`,
        [email, password]
      );

      if (res.rows.length > 0) {
        const item = res.rows.item(0);
        const usuario: Usuario = {
          id: item.id,
          name: item.name,
          email: item.email,
          password: item.password,
          peliculas: [],
          comentarios: [],
        };
        return usuario;
      }
    } catch (error) {
      console.error('Error al buscar usuario por credenciales:', error);
    }

    return null;
  }

  async agregarPeliculaAUsuario(userId: number, pelicula: Pelicula) {
    if (!this.database) return;
    try {
      await this.database.executeSql(
        `INSERT INTO pelicula (title, year, rating, genre, image, directorId, userId) VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [
          pelicula.title,
          pelicula.year,
          pelicula.rating,
          pelicula.genre,
          pelicula.image,
          pelicula.director?.id ?? null,
          userId,
        ]
      );
      console.log('Película agregada al usuario');
    } catch (error) {
      console.error('Error al agregar película al usuario:', error);
    }
  }

  async obtenerPeliculasCatalogo(): Promise<any[]> {
    if (!this.database) return [];
    try {
      const res = await this.database.executeSql(
        `SELECT * FROM pelicula_catalogo;`,
        []
      );
      const peliculas: PeliculaCatalogo[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        peliculas.push(res.rows.item(i));
      }

      return peliculas;
    } catch (error) {
      console.error('Error al obtener catálogo de películas:', error);
      return [];
    }
  }

  async agregarPeliculaAlUsuario(userId: number, catalogoId: number) {
    if (!this.database) return;
    try {
      await this.database.executeSql(
        `INSERT INTO pelicula (userId, catalogoId) VALUES (?, ?);`,
        [userId, catalogoId]
      );
      console.log('Película asociada al usuario');
    } catch (error) {
      console.error('Error al asociar película al usuario:', error);
    }
  }

  async obtenerPeliculasDeUsuario(userId: number): Promise<PeliculaCatalogo[]> {
    if (!this.database) return [];
    try {
      const res = await this.database.executeSql(
        `SELECT pc.* FROM pelicula p JOIN pelicula_catalogo pc ON p.catalogoId = pc.id WHERE p.userId = ?;`,
        [userId]
      );
      const peliculas: PeliculaCatalogo[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        peliculas.push(res.rows.item(i));
      }
      return peliculas;
    } catch (error) {
      console.error('Error al obtener películas del usuario:', error);
      return [];
    }
  }

  async obtenerDirectores(): Promise<any[]> {
    if (!this.database) return [];
    try {
      const res = await this.database.executeSql(`SELECT * FROM director;`, []);
      const directores: Director[] = [];

      for (let i = 0; i < res.rows.length; i++) {
        directores.push(res.rows.item(i));
      }

      return directores;
    } catch (error) {
      console.error('Error al obtener directores', error);
      return [];
    }
  }

  async obtenerPeliculasDirector(
    directorId: number
  ): Promise<PeliculaCatalogo[]> {
    if (!this.database) return [];
    try {
      const res = await this.database.executeSql(
        `SELECT * FROM pelicula_catalogo WHERE directorId = ?;`,
        [directorId]
      );
      const peliculas: PeliculaCatalogo[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        peliculas.push(res.rows.item(i));
      }
      return peliculas;
    } catch (error) {
      console.error('Error al obtener películas del director', error);
      return [];
    }
  }

  async obtenerComentarios(): Promise<any[]> {
    if (!this.database) return [];
    try {
      const res = await this.database.executeSql(
        `SELECT * FROM comentario;`,
        []
      );
      const comentarios: Comentario[] = [];

      for (let i = 0; i < res.rows.length; i++) {
        comentarios.push(res.rows.item(i));
      }

      return comentarios;
    } catch (error) {
      console.error('Error al obtener directores', error);
      return [];
    }
  }
}
