import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { userData } from 'src/assets/mocks/fakeData';
import { ApiserviceService } from '../apiservice.service';
import { Geolocation } from '@capacitor/geolocation';


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


  constructor(private api: ApiserviceService, private router: Router) {
    if (this.router.getCurrentNavigation()?.extras.state)
      this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const loggedUsername = localStorage.getItem('loggedUser');

    this.username = loggedUsername || '';

    for (let user of users) {
      if (user.username === this.username && user.movies) {
        this.peliculas = user.movies;
        break;
      }
    }

    console.log(this.peliculas);
    this.loadWeather();
  }

  irADirectores() {
    this.router.navigate(['/directores']);
  }

  irAComentarios() {
    this.router.navigate(['/comentarios']);
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
