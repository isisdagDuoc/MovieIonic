import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/dataservice.service';
import { PeliculaCatalogo } from '../../services/DB/models/pelicula-catalogo';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.scss'],
  standalone: false,
})
export class PeliculaComponent implements OnInit {
  @Input() set pelicula(value: PeliculaCatalogo | null) {
    if (value) {
      this.movieInfo = value;
      this.peliculaRecibidaDirecta = true;
    }
  }

  @Input() id?: number;

  @Input() state: any;

  movieInfo: PeliculaCatalogo | null = null;
  private peliculaRecibidaDirecta = false;

  constructor(private router: Router, private ds: DataService) {}

  async ngOnInit() {
    await this.ds.init();

    if (this.peliculaRecibidaDirecta && this.movieInfo) {
      return;
    }

    if (this.id != null) {
      const catalogo = await this.ds.obtenerPeliculasCatalogo();
      this.movieInfo = catalogo.find((p) => p.id === this.id) || null;
    }

    if (!this.movieInfo) {
      console.warn('[PeliculaComponent] No se pudo obtener la película.');
    }
  }

  irADetallePelicula() {
    if (!this.movieInfo) return;

    this.router.navigate(['/peliculas/' + this.movieInfo.id], {
      state: {
        ...this.state,
        pelicula: this.movieInfo,
      },
    });
  }

  getImageSrc(path: string | undefined) {
    if (!path) return 'assets/images/default.jpg';
    const clean = path.startsWith('/') ? path.substring(1) : path;
    return `assets/images/${clean}`;
  }
}
