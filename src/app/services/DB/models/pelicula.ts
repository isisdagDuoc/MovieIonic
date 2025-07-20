import { Director } from './director';
import { Usuario } from './usuario';

export class Pelicula {
  id: number = -1;
  title: string = "";
  year: number = 0;
  rating: number = 0;
  genre: string = "";
  image: string = "";
  director!: Director;
  user!: Usuario;
  description: string = "";
}
