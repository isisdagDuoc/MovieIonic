import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PeliculaCatalogo } from '../services/DB/models/pelicula-catalogo';
import { DataService } from '../services/dataservice.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.page.html',
  styleUrls: ['./peliculas.page.scss'],
  standalone: false,
})
export class PeliculasPage implements OnInit {
  peliculas: PeliculaCatalogo[] = [];
  pelicula: any = {};
  state: any;
  id: any;
  peliculasDirector: PeliculaCatalogo[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ds: DataService
  ) {
    if (!this.router.getCurrentNavigation()?.extras.state)
      this.router.navigate(['/login']);
    else this.state = this.router.getCurrentNavigation()?.extras.state;
    this.id = this.route.snapshot.paramMap.get('id');

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.state?.pelicula) {
      this.pelicula = this.state.pelicula;
    }
  }

  async ngOnInit() {

    await this.ds.init();
    if (this.state && this.state.userId) {
      const peliculasUsuario = await this.ds.obtenerPeliculasDeUsuario(this.state.userId);
      if (!peliculasUsuario || peliculasUsuario.length === 0) {
        const catalogo = await this.ds.obtenerPeliculasCatalogo();
        const peliculasEjemplo = catalogo.slice(0, 2);
        if (peliculasEjemplo.length > 0) {
          await this.ds.agregarPeliculasAUsuario(this.state.userId, peliculasEjemplo);
        }
      }
    }

    this.getPeliculas();
  }

  async getPeliculas() {
    await this.ds.init();
    if (this.state && this.state.userId) {
      this.peliculas = await this.ds.obtenerPeliculasDeUsuario(this.state.userId);
      this.pelicula = this.peliculas.find(
        (p) => String(p.id) === String(this.id)
      );
    } else {
      console.warn('[getPeliculas] No hay userId en state');
    }
  }

  getImageSrc(imagePath: string): string {
    if (!imagePath) return 'assets/images/default.jpg';

    const cleanPath = imagePath.startsWith('/')
      ? imagePath.substring(1)
      : imagePath;
    return `assets/images/${cleanPath}`;
  }

  volverAlHome() {
    this.router.navigate(['/home'], { state: this.state });
  }
}
