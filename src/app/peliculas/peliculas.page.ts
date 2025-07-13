import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SQLiteService } from '../services/DB/sql-lite.service';
import { PeliculaCatalogo } from '../services/DB/models/pelicula-catalogo';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.page.html',
  styleUrls: ['./peliculas.page.scss'],
  standalone: false,
})
export class PeliculasPage implements OnInit {
  peliculas: PeliculaCatalogo[] = [];
  pelicula: any[] = [];
  state: any;

  constructor(private router: Router, private db: SQLiteService) {
    if (!this.router.getCurrentNavigation()?.extras.state)
      this.router.navigate(['/login']);
    else this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  async ngOnInit() {
    this.db.dbState().subscribe(async (res) => {
      if (res) {

      console.log('1. Peliculas favoritas del usuario desde el state:', JSON.stringify(this.state));

        if (
          this.state &&
          this.state.userId &&
          this.state.peliculas &&
          Array.isArray(this.state.peliculas) &&
          this.state.peliculas.length > 0
        ) {

          console.log('2. Peliculas favoritas del usuario desde el state:', JSON.stringify(this.state));
          this.pelicula = this.state.peliculas;
          this.pelicula = await this.db.obtenerPeliculasDeUsuario(
            this.state.userId
          );
        }
      }
    });
  }

  getImageSrc(imagePath: string): string {
    if (!imagePath) return 'assets/images/default.jpg';

    const cleanPath = imagePath.startsWith('/')
      ? imagePath.substring(1)
      : imagePath;
    return `assets/${cleanPath}`;
  }

  volverAlHome() {
    this.router.navigate(['/home'], { state: this.state });
  }
}
