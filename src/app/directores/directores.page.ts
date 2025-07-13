import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SQLiteService } from '../services/DB/sql-lite.service';

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

  constructor(private router: Router, private db: SQLiteService) {
    if (this.router.getCurrentNavigation()?.extras.state)
      this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit() {
    this.obtenerDirectores();
    this.obtenerPeliculasCatalogo();
  }

  obtenerDirectores() {
    this.db.dbState().subscribe(async (res) => {
      if (res) {
        this.directores = await this.db.obtenerDirectores();
      }
    });
  }

  obtenerPeliculasCatalogo() {
    this.db.dbState().subscribe(async (res) => {
      if (res) {
        this.allMovies = await this.db.obtenerPeliculasCatalogo();
      }
    });
  }

  getPeliculasDirector(director: any) {
    return this.allMovies.filter((p) => p.directorId === director.id);
  }

  irAHome() {
    this.router.navigate(['/home']);
  }
}
