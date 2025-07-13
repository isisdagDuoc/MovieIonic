import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { userData } from 'src/assets/mocks/fakeData';
import { ApiserviceService } from '../services/apiservice.service';
import { Geolocation } from '@capacitor/geolocation';
import { SQLiteService } from '../services/DB/sql-lite.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  username: String = '';
  peliculas: Array<any> = [];
  state: any;

  user: any;
  users: any;
  posts: any;
  post: any = {
    id: null,
    title: '',
    body: '',
    userId: null,
  };
  compareWith: any;
  currentWeather: any = null;


  constructor(private api: ApiserviceService, private router: Router, private db: SQLiteService) {
    if (this.router.getCurrentNavigation()?.extras.state)
      this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  async ngOnInit() {
    this.db.dbState().subscribe(async (res) => {
      if (res) {

        if (this.state && this.state.email && this.state.username) {

          const password = localStorage.getItem('loggedPass') || '';
          const usuario = await this.db.obtenerUsuario(this.state.email, password);

          if (usuario) {
            this.username = usuario.name;
            this.peliculas = await this.db.obtenerPeliculasDeUsuario(usuario.id);

            console.log('Peliculas del usuario obtenidas:', JSON.stringify(this.peliculas));
          } else {
            this.peliculas = [];
            this.username = '';
            console.log('Usuario no encontrado en la base de datos');
          }
        }
        this.loadWeather();
      }
    });
  }

  irADirectores() {
    this.router.navigate(['/directores']);
  }

  irAComentarios() {
    this.router.navigate(['/comentarios']);
  }

  irAPeliculas() {
    console.log('Navegando a /peliculas con state resultados completos home page:', JSON.stringify(this.state));
    this.router.navigate(['/peliculas'], {
      state: {
        userId: this.state?.userId,
        peliculas: this.peliculas,
        ...this.state
      }
    });
  }

  async loadWeather() {
  try {
    const coords = await Geolocation.getCurrentPosition();
    const lat = coords.coords.latitude;
    const lon = coords.coords.longitude;

    this.api.getWeather(lat, lon).subscribe((data) => {
      this.currentWeather = {
        temperature: data.current.temperature_2m,
        code: data.current.weather_code
      };
      console.log("Clima:", data);
    });
  } catch (err) {
    console.error("Error al obtener geolocalización o clima", err);
  }
}
}
