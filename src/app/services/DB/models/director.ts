import { Pelicula } from './pelicula';

export class Director {
  id: number = -1;
  name: string = "";
  birthYear: number = 0;
  nationality: string = "";
  image: string = "";
  peliculas: Pelicula[] = [];
}
