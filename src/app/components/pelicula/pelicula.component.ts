import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SQLiteService } from 'src/app/services/DB/sql-lite.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.scss'],
  standalone: false,
})
export class PeliculaComponent {
  @Input() id: any;
  @Input() state: any;
  @Input() peliculas: any;
  @Input() set pelicula(value: any) {
    this.movieInfo = value;
  }
  movieInfo: any = {};
  peliculasArray = [];
  peliculaSeleccionada: any;

  constructor(private router: Router, private db: SQLiteService) {
    if (this.router.getCurrentNavigation()?.extras.state)
      this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  async ngOnInit() {
    this.obtenerPeliculas();
  }

  obtenerPeliculas(){
    this.db.dbState().subscribe(async (res) => {
      if (res) {
        this.peliculas = await this.db.obtenerPeliculasDeUsuario(
          this.state.userId
        );
        console.log('[DEBUG-PELIS][PeliculaComponent][obtenerPeliculas] peliculas:', JSON.stringify(this.peliculas), 'buscando id:', this.id);
        for (let pelicula of this.peliculas) {
          if (pelicula.id === Number(this.id)) {
            this.movieInfo = pelicula;
            break;
          }
        }
      }
    })
  }

  irADetallePelicula() {
    this.router.navigate(['/peliculas/' + this.id], { state: this.state });
  }

  getImageSrc(path: string) {
    if (!path) return 'assets/images/default.jpg';
    const clean = path.startsWith('/') ? path.substring(1) : path;
    return `assets/${clean}`;
  }
}
