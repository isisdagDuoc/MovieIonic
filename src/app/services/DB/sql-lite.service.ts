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
            (8, 'The Wolf of Wall Street', 2013, 8.2, 'Comedia', 'wolf.jpg', 5)
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
        (6, 'Quentin Tarantino', 1963, 'American', 'tarantino.jpg');`,
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
        console.error('Error al crear o poblar tablas:', error);
        this.dbLista.next(false);
      }
    } else {
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

      // Agregar películas solo si existen
      if (usuario.peliculas && usuario.peliculas.length > 0) {
        for (const pelicula of usuario.peliculas) {
          await this.database.executeSql(
            `INSERT INTO pelicula (userId, catalogoId) VALUES (?, ?);`,
            [userId, pelicula.id] 
          );
        }
      }

      // Si quieres agregar comentarios asociados, puedes hacerlo aquí de forma similar
      // if (usuario.comentarios && usuario.comentarios.length > 0) {
      //   for (const comentario of usuario.comentarios) {
      //     await this.database.executeSql(
      //       `INSERT INTO comentario (userId, name, text) VALUES (?, ?, ?);`,
      //       [userId, comentario.name, comentario.text]
      //     );
      //   }
      // }

      console.log('Usuario y sus películas agregados');
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
          peliculas: [], // Siempre array
          comentarios: [], // Siempre array
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

  async obtenerTodasPeliculas(): Promise<Pelicula[]> {
    if (!this.database) return [];
    try {
      const res = await this.database.executeSql(`SELECT * FROM pelicula;`, []);
      const peliculas: Pelicula[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        peliculas.push(res.rows.item(i));
      }
      console.log('Películas obtenidas:', peliculas);
      return peliculas;
    } catch (error) {
      console.error('Error al obtener todas las películas:', error);
      return [];
    }
  }

  async obtenerPeliculasCatalogo(): Promise<any []> {
    if (!this.database) return [];
    try {
      const res = await this.database.executeSql(`SELECT * FROM pelicula_catalogo;`, []);
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
}
