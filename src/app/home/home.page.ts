import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
import { Geolocation } from '@capacitor/geolocation';

import { DataService } from '../services/dataservice.service'; // 👈 usa DataService

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

  currentWeather: any = null;

  constructor(
    private api: ApiserviceService,
    private router: Router,
    private ds: DataService
  ) {
    if (this.router.getCurrentNavigation()?.extras.state)
      this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  async ngOnInit() {
    await this.ds.init();

    if (this.state && this.state.email && this.state.username) {
      const password = localStorage.getItem('loggedPass') || '';

      const usuario = await this.ds.obtenerUsuario(this.state.email, password);

      if (usuario) {
        this.username = usuario.name;

        const peliculas: any[] = await this.ds.obtenerPeliculasDeUsuario(usuario?.id) || [];

        if (peliculas.length > 0) {
          this.peliculas = peliculas;
        }

        if (usuario.peliculas && usuario.peliculas.length > 0) {
          this.peliculas = usuario.peliculas;
        }

        console.log(
          'Películas del usuario obtenidas:',
          JSON.stringify(this.peliculas)
        );
      } else {
        this.peliculas = [];
        this.username = '';
      }
    }

    this.loadWeather();
  }

  irADirectores() {
    this.router.navigate(['/directores']);
  }

  irAComentarios() {
    this.router.navigate(['/comentarios']);
  }

  irAPeliculas() {
    this.router.navigate(['/peliculas'], {
      state: {
        userId: this.state?.userId,
        peliculas: this.peliculas,
        ...this.state,
      },
    });
  }

  async loadWeather() {
    try {
      const permResult = await Geolocation.requestPermissions();

      if (permResult.location !== 'granted') {
        throw new Error('Permiso de geolocalización denegado');
      }

      const coords = await Geolocation.getCurrentPosition();
      const lat = coords.coords.latitude;
      const lon = coords.coords.longitude;

      this.api.getWeather(lat, lon).subscribe((data) => {
        this.currentWeather = {
          temperature: data.current.temperature_2m,
          code: data.current.weather_code,
        };
        console.log('Clima:', data);
      });
    } catch (err) {
      console.error('Error al obtener geolocalización o clima', err);
    }
  }
}
