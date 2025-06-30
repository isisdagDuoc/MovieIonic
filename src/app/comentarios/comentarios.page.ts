import { Component, OnInit } from '@angular/core';
import { userData } from 'src/assets/mocks/fakeData';
import { Router } from '@angular/router';


@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
  standalone: false,
})
export class ComentariosPage implements OnInit {

  comentarios: any[] = [];
  state: any;

      constructor(private router: Router) {
    if(this.router.getCurrentNavigation()?.extras.state)
      this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit() {
    this.comentarios = userData.comments || userData["comments"] || [];
  }

    irAHome() {
    this.router.navigate(['/home']);
  }

}