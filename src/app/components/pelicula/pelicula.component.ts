import { Component, OnInit, Input } from '@angular/core';
import { userData } from '../../../assets/mocks/fakeData';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.scss'],
  standalone: false
})
export class PeliculaComponent  implements OnInit {

  @Input() id : Number = -1;
  @Input() state : any;
  movieInfo : any = {};  

  constructor(private router: Router) {}

 ngOnInit() {
    console.log(this.state, '<<<');

    for (let user of userData.users) {
      if (user.movies) {
        for (let movie of user.movies) {
          if (movie.id === Number(this.id)) {
            this.movieInfo = movie;
            break;
          }
        }
      }
    }
     console.log('Movie info encontrada:', this.movieInfo);
  }

  irADetallePelicula() {
    this.router.navigate(['/peliculas/' + this.id], { state: this.state });
  }


}
