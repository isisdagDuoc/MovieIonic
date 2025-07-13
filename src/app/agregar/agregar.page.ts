import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { SQLiteService } from '../services/DB/sql-lite.service';
import { Usuario } from '../services/DB/models/usuario';
import { Pelicula } from '../services/DB/models/pelicula';
import { PeliculaCatalogo } from '../services/DB/models/pelicula-catalogo';

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
    private renderer: Renderer2,
    private db: SQLiteService
  ) {}

  async ngOnInit() {

    this.db.dbState().subscribe(async (res) => {
      if (res) {
        this.obtenerPeliculas();
      }
    });
  }

  showError(message: string) {
    this.mensaje = message;
  }

  obtenerPeliculas() {
    this.db.dbState().subscribe(async (res) => {
      if (res) {
        try {
          this.availableMovies = await this.db.obtenerPeliculasCatalogo();
        } catch (error) {
          this.showError('Obtención de películas fallida');
        }
      }
    });
  }

  doRegistro() {
    const { username, email, password, confirmPassword, movies } = this.data;

    this.db.dbState().subscribe(async (res) => {
      if (res) {

        if (!username || !email || !password || !confirmPassword) {
          this.showError('Todos los campos son obligatorios.');
          return;
        }

        if (password !== confirmPassword) {
          this.showError('Las contraseñas no coinciden.');
          return;
        }

        const usuarios = await this.db.obtenerUsuarios();

        const userExists = usuarios.some((u: any) => u.email === email);

        if (userExists) {
          this.showError('Ya existe un usuario con este correo.');
          return;
        }

        const nuevoUsuario: Usuario = {
          id: 0,
          name: username,
          email: email,
          password: password,
          peliculas: [],
          comentarios: [],
        };

        const registroExitoso = await this.db.agregarUsuario(nuevoUsuario);

        if (!registroExitoso) {
          this.showError('Ocurrió un error al registrar el usuario.');
          return;
        }

        const usuariosActualizados = await this.db.obtenerUsuarios();

        const usuarioCreado = usuariosActualizados.find((u: any) => u.email === email);
        if (!usuarioCreado) {
          this.showError('No se pudo encontrar el usuario recién creado.');
          return;
        }

        if (usuarioCreado && movies.length > 0) {
          for (const pelicula of movies) {
            await this.db.agregarPeliculaAlUsuario(usuarioCreado.id, pelicula.id);
          }
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
    });
  }
}
