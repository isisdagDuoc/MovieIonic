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
  
  errorMessage: string = '';
  showError: boolean = false;

  constructor(
    private router: Router,
    private ds: DataService
  ) {}

  showErr(errMsg: string) {
    this.errorMessage = errMsg;
    this.showError = true;
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
      this.clearErrs();
    }, 5000);
  }

  clearErrs() {
    this.errorMessage = '';
    this.showError = false;
  }

  validateInputs(): boolean {
    let valid = true;
    this.clearErrs();

    if (!this.data.username?.trim()) {
      this.showErr('Debe ingresar un nombre de usuario');
      valid = false;
    }
    
    if (!this.data.email?.trim()) {
      this.showErr('Debe ingresar un correo válido');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.data.email)) {
      this.showErr('El formato del correo no es válido');
      valid = false;
    }
    
    if (!this.data.password || this.data.password.length < 4) {
      this.showErr('La contraseña debe tener al menos 4 caracteres');
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

    try {
      await this.ds.init();

      const usuario = await this.ds.obtenerUsuario(this.data.email, this.data.password);

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

      this.data = { username: '', password: '', email: '' };
      
      this.router.navigate(['/home'], navExtras);
    } catch (error) {
      console.error('Error during login:', error);
      this.showErr('Error al iniciar sesión. Intente nuevamente.');
    }
  }
}
