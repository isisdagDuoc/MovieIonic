import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/dataservice.service';

@Component({
  selector: 'app-directores',
  templateUrl: './directores.page.html',
  styleUrls: ['./directores.page.scss'],
  standalone: false,
})
export class DirectoresPage implements OnInit {
  directores: any[] = [];
  allMovies: any[] = [];
  state: any;

  constructor(private router: Router, private ds: DataService) {
    if (this.router.getCurrentNavigation()?.extras.state)
      this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  async ngOnInit() {
    await this.ds.init();
    this.obtenerDirectores();
    this.obtenerPeliculasCatalogo();
  }

  async obtenerDirectores() {
    try {
      this.directores = await this.ds.obtenerDirectores();
    } catch (error) {
      console.error('[DirectoresPage] Error al obtener directores:', error);
    }
  }

  async obtenerPeliculasCatalogo() {
    try {
      this.allMovies = await this.ds.obtenerPeliculasCatalogo();
    } catch (error) {
      console.error('Error al obtener películas:', error);
    }
  }

  getPeliculasDirector(director: any) {
    return this.allMovies.filter((p) => p.directorId === director.id);
  }

  irAHome() {
    this.router.navigate(['/home'], { state: this.state });
  }

  getImageSrc(path: string) {
    if (!path) return 'assets/images/default.jpg';
    const clean = path.startsWith('/') ? path.substring(1) : path;
    return `assets/images/${clean}`;
  }
}
