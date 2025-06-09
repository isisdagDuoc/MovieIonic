import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { userData } from '../../../assets/mocks/fakeData';

@Component({
  selector: 'cs-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: false
})
export class LoginFormComponent  implements OnInit {
   data: {
    username: string;
    password: string;
    email?: string;
  } = {
    username: '',
    password: '',
    email: ''
  }

    constructor(private router: Router) { }

    showErr(errMsg: String) {
    const errorElem: HTMLElement | null = document.getElementById('errCont');

    if(errorElem != null) {
      const msgElem = document.createTextNode(errMsg.toString());
      const itemElem = document.createElement("li");
      itemElem.appendChild(msgElem);
      errorElem.appendChild(itemElem)     
    }
  }

    clearErrs() {
    const errorElem: HTMLElement | null = document.getElementById('errCont');

    if(errorElem != null)
      errorElem.innerHTML = '';
  }

    validateInputs = () => {
    const nombreInput = document.getElementById('nombreUsuario') as HTMLInputElement;
    const correoInput = document.getElementById('correoUsuario') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    let valid = true;

    if(nombreInput?.value === '') {
      this.showErr("Debe ingresar un nombre de usuario");
      valid = false;
    }

    if(correoInput?.value === '') {
      this.showErr("Debe ingresar un correo valido");
      valid = false;
    }

    if(passwordInput?.value.length < 4) {
      this.showErr("La contraseña debe tener al menos 4 caracteres.");
      valid = false;
    }

    if(valid) {
      let usuarioExiste = false;

      for(let i in userData.users) {
        console.log(correoInput?.value, passwordInput?.value);
        if(userData.users[i].email === correoInput?.value && userData.users[i].password === passwordInput?.value)
          usuarioExiste = true;
      }

      if(!usuarioExiste) {
        this.showErr("No se encuentra un usuario con dicha contraseña.");
        valid = false;
      }
    }    
  
    return valid;
  };

  ngOnInit() {}

    doLogin() {
    this.clearErrs();

    if(!this.validateInputs())
      return;

    let navExtras: NavigationExtras = {
      state: {
        username: this.data.username,
        password: this.data.password
      }
    };

    this.router.navigate(['/home'], navExtras)
  }

}
