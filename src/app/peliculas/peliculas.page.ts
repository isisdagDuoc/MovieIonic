import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userData } from '../../assets/mocks/fakeData'

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.page.html',
  styleUrls: ['./peliculas.page.scss'],
  standalone: false
})
export class PeliculasPage implements OnInit {

  movieInfo: any = {};
  state: any;

  
  constructor(private route: ActivatedRoute, private router: Router) { 
    if(!this.router.getCurrentNavigation()?.extras.state)
      this.router.navigate(["/login"]);
    else
      this.state = this.router.getCurrentNavigation()?.extras.state;
  }

    ngOnInit() {
    console.log(this.state);
    let id = this.route.snapshot.paramMap.get('id');

    for (let user of userData.users) {
      if (user.movies) {
        for (let movie of user.movies) {
          if (movie.id == Number(id)) {
            this.movieInfo = movie;
            break;
          }
        }
      }
    }
  }

    volverAlHome() {
    this.router.navigate(['/home'], { state : this.state });
  }


}
