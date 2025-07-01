import { Component, OnInit } from '@angular/core';
import { userData } from 'src/assets/mocks/fakeData';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
  standalone: false,
})
export class ComentariosPage implements OnInit {
  comentarios: any[] = [];
  state: any;
  posts: any[] = [];
  allComentarios: any[] = [];
  comentariosPaginados: any[] = [];

  currentPage = 1;
  itemsPerPage = 5;

  constructor(private router: Router, private api: ApiserviceService) {
    if (this.router.getCurrentNavigation()?.extras.state)
      this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit() {
    this.comentarios = userData.comments || userData['comments'] || [];

    this.api.getComentarios().subscribe(
      (data) => {
        this.allComentarios = data;
        this.paginateComentarios();
      },
      (error) => {
        console.error('Error al obtener comentarios', error);
      }
    );

    this.getPlaceHolders();
  }

  irAHome() {
    this.router.navigate(['/home']);
  }

  getPlaceHolders() {
    this.api.getPlaceHolders().subscribe(
      (data) => {
        this.posts = data;
        console.log('POST: ', this.posts);
      },
      (error) => {
        console.error('Error fetching placeholders', error);
      }
    );
  }

  paginateComentarios() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.comentariosPaginados = this.allComentarios.slice(start, end);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.allComentarios.length) {
      this.currentPage++;
      this.paginateComentarios();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateComentarios();
    }
  }
}
