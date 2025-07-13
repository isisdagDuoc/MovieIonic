import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SQLiteService } from '../services/DB/sql-lite.service';
import { PeliculaCatalogo } from '../services/DB/models/pelicula-catalogo';
import { get } from '@awesome-cordova-plugins/core/decorators/common';

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

  constructor(
    private router: Router,
    private db: SQLiteService,
    private route: ActivatedRoute
  ) {
    if (!this.router.getCurrentNavigation()?.extras.state)
      this.router.navigate(['/login']);
    else this.state = this.router.getCurrentNavigation()?.extras.state;
    this.id = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.getPeliculas();
  }

  getPeliculas() {
    this.db.dbState().subscribe(async (res) => {
      if (res) {
        if (this.state && this.state.userId) {
          this.peliculas = await this.db.obtenerPeliculasDeUsuario(
            this.state.userId
          );
          this.pelicula = this.peliculas.find(
            (p) => String(p.id) === String(this.id)
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
