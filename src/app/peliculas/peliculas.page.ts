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
  pelicula: PeliculaCatalogo | null = null;
  state: any;
  id: any;
  peliculasDirector: PeliculaCatalogo[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ds: DataService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (!navigation?.extras.state) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.state = navigation.extras.state;
    this.id = this.route.snapshot.paramMap.get('id');
    
    console.log('Constructor - ID de película:', this.id);
    console.log('Constructor - State recibido:', this.state);

    // Si la película viene en el state, usar solo como referencia para obtener el ID
    if (this.state?.pelicula) {
      console.log('Constructor - Película encontrada en state:', this.state.pelicula);
      // Asegurar que tenemos el ID correcto
      if (!this.id) {
        this.id = this.state.pelicula.id;
      }
    }
  }

  async ngOnInit() {
    console.log('ngOnInit - Iniciando...');
    console.log('ngOnInit - Estado actual de película:', this.pelicula);
    console.log('ngOnInit - ID:', this.id);

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
    
    // Eliminar esta verificación para SIEMPRE obtener la película completa del catálogo
    // if (this.pelicula && this.pelicula.id) {
    //   console.log('Película ya disponible desde state:', this.pelicula);
    //   return;
    // }
    
    if (!this.id) {
      console.error('No hay ID de película para buscar');
      return;
    }
    
    console.log('Obteniendo película COMPLETA con ID:', this.id);
    
    await this.ds.limpiarCatalogoPeliculas();
    
    try {
      const catalogo = await this.ds.obtenerPeliculasCatalogo();
      console.log('Catálogo obtenido:', catalogo);
      
      if (catalogo && catalogo.length > 0) {
        console.log('Primera película del catálogo:', catalogo[0]);
        console.log('¿Primera película tiene description?', catalogo[0] && 'description' in catalogo[0]);
      } 
      
      this.pelicula = catalogo.find(
        (p) => String(p.id) === String(this.id)
      ) || null;
      
    } catch (error) {
      console.error('Error al obtener catálogo de películas:', error);
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
