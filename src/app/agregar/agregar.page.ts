import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

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
    movies: [] as any[],
  };

  availableMovies = [
    {
      id: 1,
      title: 'Inception',
      year: 2010,
      rating: 8.8,
      director: 'Christopher Nolan',
      directorId: 1,
      genre: 'Ciencia Ficción',
      image: '/images/inception.jpg',
    },
    {
      id: 2,
      title: 'The Matrix',
      year: 1999,
      rating: 8.7,
      director: 'Lana Wachowski, Lilly Wachowski',
      directorId: 2,
      genre: 'Ciencia Ficción',
      image: '/images/matrix.jpg',
    },
    {
      id: 3,
      title: 'Interstellar',
      year: 2014,
      rating: 8.6,
      director: 'Christopher Nolan',
      directorId: 1,
      genre: 'Ciencia Ficción',
      image: '/images/interstellar.jpg',
    },
    {
      id: 4,
      title: 'Orgullo y Prejuicio',
      year: 2005,
      rating: 8.6,
      director: 'Joe Wright',
      directorId: 5,
      genre: 'Romance',
      image: '/images/orgullo.jpg',
    },
    {
      id: 5,
      title: 'Jurassic Park',
      year: 1993,
      rating: 8.1,
      director: 'Steven Spielberg',
      directorId: 4,
      genre: 'Aventura',
      image: '/images/jurassic.jpg',
    },
    {
      id: 6,
      title: 'Goodfellas',
      year: 1990,
      rating: 8.7,
      director: 'Martin Scorsese',
      directorId: 5,
      genre: 'Crimen',
      image: '/images/goodfellas.jpg',
    },
    {
      id: 7,
      title: 'Pulp Fiction',
      year: 1994,
      rating: 8.9,
      director: 'Quentin Tarantino',
      directorId: 6,
      genre: 'Crimen',
      image: '/images/pulp.jpg',
    },
    {
      id: 8,
      title: 'The Wolf of Wall Street',
      year: 2013,
      rating: 8.2,
      director: 'Martin Scorsese',
      directorId: 5,
      genre: 'Comedia',
      image: '/images/wolf.jpg',
    },
  ];

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {}

  showError(message: string) {
    const ul = document.getElementById('errCont');
    if (ul) {
      ul.innerHTML = '';
      const li = this.renderer.createElement('li');
      const text = this.renderer.createText(message);
      this.renderer.appendChild(li, text);
      this.renderer.appendChild(ul, li);
    }
  }

  doRegistro() {
    const { username, email, password, confirmPassword } = this.data;

    if (!username || !email || !password || !confirmPassword) {
      this.showError('Todos los campos son obligatorios.');
      return;
    }

    if (password !== confirmPassword) {
      this.showError('Las contraseñas no coinciden.');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const userExists = storedUsers.some((u: any) => u.email === email);
    if (userExists) {
      this.showError('Ya existe un usuario con este correo.');
      return;
    }

    storedUsers.push({ username, email, password, movies: this.data.movies });

    localStorage.setItem('users', JSON.stringify(storedUsers));
    localStorage.setItem('isLogin', 'true');

    const ul = document.getElementById('errCont');
    if (ul) ul.innerHTML = '';

    let navExtras = {
      state: {
        username: this.data.username,
        movies: this.data.movies,
      },
    };

    this.router.navigate(['/login'], navExtras);
  }
}
