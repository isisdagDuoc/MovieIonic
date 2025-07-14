import { Component, OnInit } from '@angular/core';
import { userData } from 'src/assets/mocks/fakeData';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
import { DataService } from '../services/dataservice.service';

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

  constructor(
    private router: Router,
    private api: ApiserviceService,
    private ds: DataService
  ) {
    if (this.router.getCurrentNavigation()?.extras.state)
      this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  async ngOnInit() {
    await this.ds.init();
    this.obtenerComentarios();
  }

  irAHome() {
    this.router.navigate(['/home'], { state: this.state });
  }

  async obtenerComentarios() {
    try {
      this.allComentarios = await this.ds.obtenerComentarios();
      this.paginateComentarios();
    } catch (error) {
      console.error('[ComentariosPage] Error al obtener comentarios:', error);
    }
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
