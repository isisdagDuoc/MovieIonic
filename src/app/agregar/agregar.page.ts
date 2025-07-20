import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../services/DB/models/usuario';
import { Pelicula } from '../services/DB/models/pelicula';
import { PeliculaCatalogo } from '../services/DB/models/pelicula-catalogo';
import { DataService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
  standalone: false,
})
export class AgregarPage implements OnInit {
  data = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    movies: [] as Pelicula[],
  };

  availableMovies: PeliculaCatalogo[] = [];
  texto: string = 'buenas';
  mensaje: string = '';

  constructor(
    private router: Router,
    private ds: DataService
  ) {}

  async ngOnInit() {
    console.log('🔄 AgregarPage - Inicializando...');
    await this.ds.init();

    if (this.ds.isReady()) {
      console.log('✅ DataService está listo');
      this.availableMovies = await this.ds.obtenerPeliculasCatalogo();
      console.log('📚 Películas cargadas en AgregarPage:', this.availableMovies?.length || 0);
      console.log('🎬 Primeras 3 películas:', this.availableMovies?.slice(0, 3));
    } else {
      console.error('❌ DB o Storage no está listo.');
      this.mensaje = 'Error: No se pudieron cargar las películas.';
    }
  }

  showError(message: string) {
    this.mensaje = message;
  }

  async obtenerPeliculas() {
    console.log('🔄 Refrescando películas...');
    if (this.ds.isReady()) {
      this.availableMovies = await this.ds.obtenerPeliculasCatalogo();
      console.log('📚 Películas recargadas:', this.availableMovies?.length || 0);
    } else {
      console.error('❌ DB o Storage no está listo para refrescar.');
      this.mensaje = 'Error: No se pudieron recargar las películas.';
    }
  }

  // Método para debugging
  async forceReloadMovies() {
    console.log('🔧 Forzando recarga de películas...');
    await this.ds.limpiarCatalogoPeliculas();
    await this.obtenerPeliculas();
  }

  async doRegistro() {
    const { username, email, password, confirmPassword, movies } = this.data;

    if (!username || !email || !password || !confirmPassword) {
      this.showError('Todos los campos son obligatorios.');
      return;
    }

    if (password !== confirmPassword) {
      this.showError('Las contraseñas no coinciden.');
      return;
    }

    const usuarios = await this.ds.obtenerUsuarios();
    const userExists = usuarios.some((u: any) => u.email === email);

    if (userExists) {
      this.showError('Ya existe un usuario con este correo.');
      return;
    }

    const peliculasCatalogo: PeliculaCatalogo[] = movies.map((p) => ({
      id: p.id,
      title: p.title,
      year: p.year,
      rating: p.rating,
      genre: p.genre,
      image: p.image,
      directorId: p.director?.id || 0,
      description: p.description || '',
    }));

    const nuevoUsuario: Usuario = {
      id: 0,
      name: username,
      email: email,
      password: password,
      peliculas: [],
      comentarios: [],
    };

    const registroExitoso = await this.ds.agregarUsuario(nuevoUsuario);

    if (!registroExitoso) {
      this.showError('Ocurrió un error al registrar el usuario.');
      return;
    }

    const usuarioCreado = await this.ds.obtenerUsuario(email, password);

    if (!usuarioCreado) {
      this.showError('No se pudo encontrar el usuario recién creado.');
      return;
    }

    if (usuarioCreado && movies.length > 0) {
      await this.ds.agregarPeliculasAUsuario(usuarioCreado.id, peliculasCatalogo);
    }

    localStorage.setItem('loggedUser', usuarioCreado.name);
    localStorage.setItem('loggedPass', usuarioCreado.password);

    let navExtras = {
      state: {
        username: usuarioCreado.name,
        email: usuarioCreado.email,
        userId: usuarioCreado.id,
        peliculas: movies.map((p) => p.title),
      },
    };
    console.log('se registro?', JSON.stringify(usuarioCreado));

    this.router.navigate(['/login'], navExtras);
  }
}
