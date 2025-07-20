import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from '../DB/models/usuario';
import { PeliculaCatalogo } from '../DB/models/pelicula-catalogo';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _isReady: boolean = false;

  constructor(private _storage: Storage) {
    this.init();
  }

  async init() {
    await this._storage.create();
    this._isReady = true;
    const exists = await this._storage.get('peliculas_catalogo');
    if (!exists) {
      await this.initCatalogoPeliculas();
    }
    
    const existsDirectores = await this._storage.get('directores');
    if (!existsDirectores) {
      await this.initDirectores();
    }
    
    const existsComentarios = await this._storage.get('comentarios');
    if (!existsComentarios) {
      await this.initComentarios();
    }
  }

  get isReady() {
    return this._isReady;
  }

  async getKeys(): Promise<string[]> {
    return (await this._storage?.keys()) || [];
  }
  async set(key: string, value: any): Promise<void> {
    if (!this._isReady) await this.init();
    await this._storage.set(key, value);
  }

  async get(key: string): Promise<any> {
    if (!this._isReady) await this.init();
    return await this._storage.get(key);
  }

  async remove(key: string): Promise<void> {
    if (!this._isReady) await this.init();
    await this._storage.remove(key);
  }

  async getUsuario(email: string, pass: string): Promise<Usuario | null> {
    const key = `usuario_${email}`;
    const usuario = await this.get(key);

    if (usuario && usuario.password === pass) {
      usuario.peliculas = await this.getPeliculasDeUsuario(usuario.id);
      return usuario;
    }

    return null;
  }

  async addUsuario(usuario: Usuario): Promise<boolean> {
    const key = `usuario_${usuario.email}`;
    await this.set(key, usuario);
    return true;
  }

  async getPeliculasDeUsuario(userId: number): Promise<PeliculaCatalogo[]> {
    const peliculas: PeliculaCatalogo[] =
      (await this.get(`peliculas_user_${userId}`)) || [];
    return peliculas;
  }

  async addPeliculasToUsuario(userId: number, peliculas: PeliculaCatalogo[]) {
    await this.set(`peliculas_user_${userId}`, peliculas);
  }
  
  async getDirectores(): Promise<any[]> {
    const directores = await this.get('directores');
    return directores || [];
  }

  async getComentarios(): Promise<any[]> {
    const comentarios = await this.get('comentarios');
    return comentarios || [];
  }

  async setDirectores(directores: any[]) {
    await this.set('directores', directores);
  }

  async setComentarios(comentarios: any[]) {
    await this.set('comentarios', comentarios);
  }

  async initDirectores() {
    const directores = [
      {id: 1, name: 'Christopher Nolan', birthYear: 1970, nationality: 'British-American', image: 'nolan.jpg'},
      {id: 2, name: 'Lana Wachowski', birthYear: 1965, nationality: 'American', image: 'lana.jpg'},
      {id: 3, name: 'Lilly Wachowski', birthYear: 1967, nationality: 'American', image: 'lili.jpg'},
      {id: 4, name: 'Steven Spielberg', birthYear: 1946, nationality: 'American', image: 'spielberg.jpg'},
      {id: 5, name: 'Martin Scorsese', birthYear: 1942, nationality: 'American', image: 'martin-scorsese.jpg'},
      {id: 6, name: 'Quentin Tarantino', birthYear: 1963, nationality: 'American', image: 'tarantino.jpg'},
      {id: 7, name: 'Joe Wright', birthYear: 1972, nationality: 'British', image: 'joe-wright.jpg'},
      {id: 8, name: 'Ridley Scott', birthYear: 1937, nationality: 'British', image: 'ridley-scott.jpg'},
      {id: 9, name: 'Francis Ford Coppola', birthYear: 1939, nationality: 'American', image: 'coppola.jpg'},
      {id: 10, name: 'Peter Jackson', birthYear: 1961, nationality: 'New Zealander', image: 'peter-jackson.jpg'},
      {id: 11, name: 'James Cameron', birthYear: 1954, nationality: 'Canadian', image: 'james-cameron.jpg'}
    ];

    await this.set('directores', directores);
  }

  async initComentarios() {
    const comentarios = [
      {userId: 1, name: 'Alice', text: 'Orgullo y Prejuicio es una película hermosa, con una historia de amor conmovedora.'},
      {userId: 2, name: 'isis', text: 'Jurassic Park es un clásico de la ciencia ficción, ¡me encanta!'},
      {userId: 1, name: 'Alice', text: 'Inception es una obra maestra de Christopher Nolan, ¡me dejó sin aliento!'},
      {userId: 2, name: 'isis', text: 'The Matrix cambió mi forma de ver el cine, ¡es increíble!'},
      {userId: 1, name: 'Alice', text: 'Pulp Fiction es una película icónica, ¡me encanta la narrativa no lineal!'},
      {userId: 2, name: 'isis', text: 'Goodfellas es una obra maestra del cine de crimen, ¡la actuación es impresionante!'},
      {userId: 1, name: 'Alice', text: 'Interstellar es una experiencia visual y emocional única, ¡me hizo reflexionar sobre el tiempo y el amor!'},
      {userId: 2, name: 'isis', text: 'The Wolf of Wall Street es una película divertida y provocativa, ¡Leonardo DiCaprio está increíble!'}
    ];

    await this.set('comentarios', comentarios);
  }

  async initCatalogoPeliculas() {
    const peliculasCatalogo = [
      {
        id: 1,
        title: 'Inception',
        year: 2010,
        rating: 8.8,
        genre: 'Ciencia Ficción',
        image: 'inception.jpg',
        directorId: 1,
        description: 'Inception es una película de ciencia ficción dirigida por Christopher Nolan, que sigue a un ladrón de sueños que debe realizar un último trabajo para borrar su pasado.'
      },
      {
        id: 2,
        title: 'The Matrix',
        year: 1999,
        rating: 8.7,
        genre: 'Ciencia Ficción',
        image: 'matrix.jpg',
        directorId: 2,
        description: 'The Matrix es una película de ciencia ficción dirigida por las hermanas Wachowski, que explora un mundo virtual controlado por máquinas y la lucha de los humanos por liberarse.'
      },
      {
        id: 3,
        title: 'Interstellar',
        year: 2014,
        rating: 8.6,
        genre: 'Ciencia Ficción',
        image: 'interstellar.jpg',
        directorId: 1,
        description: 'Interstellar es una película de ciencia ficción dirigida por Christopher Nolan, que narra la historia de un grupo de astronautas que viajan a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.'
      },
      {
        id: 4,
        title: 'Orgullo y Prejuicio',
        year: 2005,
        rating: 8.6,
        genre: 'Romance',
        image: 'orgullo.jpg',
        directorId: 5,
        description: 'Orgullo y Prejuicio es una adaptación cinematográfica de la novela clásica de Jane Austen, que narra la historia de Elizabeth Bennet y su relación con el orgulloso Mr. Darcy.'
      },
      {
        id: 5,
        title: 'Jurassic Park',
        year: 1993,
        rating: 8.1,
        genre: 'Aventura',
        image: 'jurassic.jpg',
        directorId: 4,
        description: 'Jurassic Park es una película de ciencia ficción dirigida por Steven Spielberg, basada en la novela de Michael Crichton, que narra la historia de un parque temático con dinosaurios clonados.'
      },
      {
        id: 6,
        title: 'Goodfellas',
        year: 1990,
        rating: 8.7,
        genre: 'Crimen',
        image: 'goodfellas.jpg',
        directorId: 5,
        description: 'Goodfellas es una película de crimen dirigida por Martin Scorsese, que narra la vida de un joven que se convierte en miembro de la mafia.'
      },
      {
        id: 7,
        title: 'Pulp Fiction',
        year: 1994,
        rating: 8.9,
        genre: 'Crimen',
        image: 'pulp.jpg',
        directorId: 6,
        description: 'Pulp Fiction es una película de culto dirigida por Quentin Tarantino, que entrelaza varias historias de crimen en Los Ángeles.'
      },
      {
        id: 8,
        title: 'The Wolf of Wall Street',
        year: 2013,
        rating: 8.2,
        genre: 'Comedia',
        image: 'wolf.jpg',
        directorId: 5,
        description: 'The Wolf of Wall Street es una película basada en la vida de Jordan Belfort, un corredor de bolsa que se convirtió en millonario a través de prácticas fraudulentas y excesos desenfrenados.'
      },
      {
        id: 9,
        title: 'The Shawshank Redemption',
        year: 1994,
        rating: 9.3,
        genre: 'Drama',
        image: 'shawshank.jpg',
        directorId: 5,
        description: 'The Shawshank Redemption es una película épica que narra la historia de Andy Dufresne, un banquero condenado a cadena perpetua en la prisión de Shawshank, y su amistad con el preso Red.'
      },
      {
        id: 10,
        title: 'The Godfather',
        year: 1972,
        rating: 9.2,
        genre: 'Crimen',
        image: 'godfather.jpg',
        directorId: 5,
        description: 'The Godfather es una película épica que narra la historia de la familia mafiosa Corleone, centrada en el patriarca Vito Corleone y su hijo Michael.'
      },
      {
        id: 11,
        title: 'Schindlers List',
        year: 1993,
        rating: 9.0,
        genre: 'Drama',
        image: 'schindler.jpg',
        directorId: 4,
        description: 'Schindlers List es una película conmovedora que narra la historia de Oskar Schindler, un empresario alemán que salvó a más de mil judíos durante el Holocausto.'
      },
      {
        id: 12,
        title: 'The Dark Knight',
        year: 2008,
        rating: 9.0,
        genre: 'Acción',
        image: 'dark-knight.jpg',
        directorId: 1,
        description: 'The Dark Knight es una película de superhéroes dirigida por Christopher Nolan, que sigue al Caballero Oscuro mientras enfrenta al Joker en una batalla épica por Gotham City.'
      },
      {
        id: 13,
        title: 'Forrest Gump',
        year: 1994,
        rating: 8.8,
        genre: 'Drama',
        image: 'forrest-gump.jpg',
        directorId: 5,
        description: 'Forrest Gump es una película conmovedora que narra la vida de un hombre con discapacidad intelectual que, a pesar de sus limitaciones, vive una vida extraordinaria y se convierte en testigo de eventos históricos importantes.'
      },
    ];

    await this.set('peliculas_catalogo', peliculasCatalogo);
  }

  async getPeliculasCatalogo(): Promise<PeliculaCatalogo[]> {
    let catalogo = await this.get('peliculas_catalogo') || [];
    
    // Si no hay catálogo o está vacío, inicializar
    if (!catalogo || catalogo.length === 0) {
      console.log('📚 Inicializando catálogo de películas...');
      await this.initCatalogoPeliculas();
      catalogo = await this.get('peliculas_catalogo') || [];
    }
    
    // Verificar si el catálogo tiene descripciones
    if (catalogo.length > 0 && catalogo[0] && !catalogo[0].description) {
      console.warn('⚠️ Catálogo sin descripciones detectado, reinicializando...');
      await this.remove('peliculas_catalogo');
      await this.initCatalogoPeliculas();
      catalogo = await this.get('peliculas_catalogo') || [];
    }
    
    console.log('✅ StorageService - Catálogo final:', catalogo.length, 'películas');
    
    return catalogo;
  }
}
