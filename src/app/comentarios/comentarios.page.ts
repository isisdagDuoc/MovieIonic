import { Component, OnInit } from '@angular/core';
import { userData } from 'src/assets/mocks/fakeData';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
  standalone: false,
})
export class ComentariosPage implements OnInit {

  comentarios: any[] = [];

  ngOnInit() {
    this.comentarios = userData.comments || userData["comments"] || [];
  }

}