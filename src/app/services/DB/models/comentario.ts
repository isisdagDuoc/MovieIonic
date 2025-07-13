import { Usuario } from './usuario';

export class Comentario {
  id: number = -1;
  userId: number = -1;
  name: string = "";
  text: string = "";
  user?: Usuario;
}
