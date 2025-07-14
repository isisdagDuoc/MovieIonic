import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'cs-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: false,
})
export class LoginFormComponent implements OnInit {
  data = {
    username: '',
    password: '',
    email: '',
  };

  constructor(
    private router: Router,
    private ds: DataService
  ) {}

  showErr(errMsg: string) {
    const errorElem: HTMLElement | null = document.getElementById('errCont');
    if (errorElem) {
      const itemElem = document.createElement('li');
      itemElem.textContent = errMsg;
      errorElem.appendChild(itemElem);
    }
  }

  clearErrs() {
    const errorElem: HTMLElement | null = document.getElementById('errCont');
    if (errorElem) errorElem.innerHTML = '';
  }

  validateInputs(): boolean {
    const nombreInput = document.getElementById('nombreUsuario') as HTMLInputElement;
    const correoInput = document.getElementById('correoUsuario') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    let valid = true;

    this.clearErrs();

    if (!nombreInput?.value) {
      this.showErr('Debe ingresar un nombre de usuario');
      valid = false;
    }
    if (!correoInput?.value) {
      this.showErr('Debe ingresar un correo válido');
      valid = false;
    }
    if (!passwordInput?.value || passwordInput.value.length < 4) {
      this.showErr('La contraseña debe tener al menos 4 caracteres.');
      valid = false;
    }

    return valid;
  }

  async ngOnInit() {
    await this.ds.init();
  }

  async doLogin() {
    this.clearErrs();
    if (!this.validateInputs()) return;

    const nombreInput = document.getElementById('nombreUsuario') as HTMLInputElement;
    const correoInput = document.getElementById('correoUsuario') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    await this.ds.init();

    const usuario = await this.ds.obtenerUsuario(correoInput.value, passwordInput.value);

    if (!usuario) {
      this.showErr('Usuario o contraseña incorrectos');
      return;
    }

    localStorage.setItem('loggedUser', usuario.email);
    localStorage.setItem('loggedPass', usuario.password);

    const navExtras: NavigationExtras = {
      state: {
        username: usuario.name,
        email: usuario.email,
        userId: usuario.id,
      },
    };

    this.router.navigate(['/home'], navExtras);
  }
}
