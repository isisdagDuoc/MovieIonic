import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { userData } from '../../../assets/mocks/fakeData';

@Component({
  selector: 'cs-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: false,
})
export class LoginFormComponent implements OnInit {
  data: {
    username: string;
    password: string;
    email?: string;
  } = {
    username: '',
    password: '',
    email: '',
  };
  constructor(private router: Router) {}

  showErr(errMsg: String) {
    const errorElem: HTMLElement | null = document.getElementById('errCont');

    if (errorElem != null) {
      const msgElem = document.createTextNode(errMsg.toString());
      const itemElem = document.createElement('li');
      itemElem.appendChild(msgElem);
      errorElem.appendChild(itemElem);
    }
  }

  clearErrs() {
    const errorElem: HTMLElement | null = document.getElementById('errCont');

    if (errorElem != null) errorElem.innerHTML = '';
  }

  validateInputs = () => {
    const nombreInput = document.getElementById(
      'nombreUsuario'
    ) as HTMLInputElement;
    const correoInput = document.getElementById(
      'correoUsuario'
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    let valid = true;

    this.clearErrs();

    if (nombreInput?.value === '') {
      this.showErr('Debe ingresar un nombre de usuario');
      valid = false;
    }

    if (correoInput?.value === '') {
      this.showErr('Debe ingresar un correo valido');
      valid = false;
    }

    if (passwordInput?.value.length < 4) {
      this.showErr('La contraseña debe tener al menos 4 caracteres.');
      valid = false;
    }

    if (valid) {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

      const usuarioExiste = storedUsers.some(
        (user: any) =>
          user.email === correoInput?.value &&
          user.password === passwordInput?.value &&
          user.username === nombreInput?.value
      );

      if (!usuarioExiste) {
        this.showErr(
          'No se encuentra un usuario con dicha contraseña o nombre de usuario.'
        );
        valid = false;
      } else {
        localStorage.setItem('isLogin', 'true');
      }
    }

    return valid;
  };

  ngOnInit() {}

  doLogin() {
    this.clearErrs();

    const nav = this.router.getCurrentNavigation();
    const extraMovies = nav?.extras.state?.['movies'] || [];

    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const matchedUser = storedUsers.find(
      (u: any) =>
        u.username === this.data.username && u.password === this.data.password
    );

    if (
      matchedUser &&
      extraMovies.length &&
      (!matchedUser.movies || matchedUser.movies.length === 0)
    ) {
      matchedUser.movies = extraMovies;
      localStorage.setItem('users', JSON.stringify(storedUsers));
    }

    localStorage.setItem('isLogin', 'true');
    localStorage.setItem('loggedUser', this.data.username);

    const navExtras: NavigationExtras = {
      state: {
        username: this.data.username,
        password: this.data.password,
      },
    };

    this.router.navigate(['/home'], navExtras);
  }
}
