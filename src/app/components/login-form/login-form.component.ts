import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { userData } from '../../../assets/mocks/fakeData';
import { SQLiteService } from '../../services/DB/sql-lite.service';

@Component({
  selector: 'cs-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: false,
  providers: [SQLiteService],
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
  constructor(private router: Router, private db: SQLiteService,) {}

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

    return valid;
  };

  
  async validateInputsDB(): Promise<boolean> {
    const nombreInput = document.getElementById('nombreUsuario') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    return new Promise((resolve) => {
      this.db.dbState().subscribe(async (res) => {
        if (res) {
          try {
            const existe = await this.db.existeUsuario(nombreInput?.value, passwordInput?.value);
            resolve(existe);
          } catch (error) {
            console.error('Error al consultar la base de datos:', JSON.stringify(error));
            this.showErr('Error al consultar la base de datos.');
            resolve(false);
          }
        }
      });
    });
  }

  ngOnInit() {
    this.db.dbState().subscribe();
  }

  async doLogin() {
    this.clearErrs();

    const inputsValidos = this.validateInputs();
    if (!inputsValidos) return;

    const nombreInput = document.getElementById('nombreUsuario') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    this.db.dbState().subscribe(async (res) => {
      if (res) {
        try {

          const usuarios = await this.db.obtenerUsuarios();
          const usuario = usuarios.find((u: any) => u.name === nombreInput?.value && u.password === passwordInput?.value);
          if (!usuario) {
            this.showErr('Usuario o contraseña incorrectos (BD)');
            return;
          }
          localStorage.setItem('isLogin', 'true');
          localStorage.setItem('loggedUser', nombreInput?.value);
          localStorage.setItem('loggedPass', passwordInput?.value);

          const navExtras: NavigationExtras = {
            state: {
              username: usuario.name,
              email: usuario.email,
              userId: usuario.id,
            },
          };

          this.router.navigate(['/home'], navExtras);
        } catch (error) {
          this.showErr('Error al validar usuario en la base de datos.');
          console.error('Error al validar usuario en la base de datos.', JSON.stringify(error));
        }
      }
    });
  }
}
