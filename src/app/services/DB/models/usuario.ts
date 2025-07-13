import { Pelicula } from './pelicula';
import { Comentario } from './comentario';

export class Usuario {
  id: number = -1;
  name: string = "";
  email: string = "";
  password: string = "";
  peliculas: Pelicula[] = [];
  comentarios: Comentario[] = [];
}
