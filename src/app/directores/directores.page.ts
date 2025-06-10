import { Component, OnInit } from '@angular/core';
import { userData } from 'src/assets/mocks/fakeData';
import { Router } from '@angular/router';


@Component({
  selector: 'app-directores',
  templateUrl: './directores.page.html',
  styleUrls: ['./directores.page.scss'],
  standalone: false
})
export class DirectoresPage implements OnInit {

  directores: any[] = [];
  allMovies: any[] = [];
  state: any;


    constructor(private router: Router) {
    if(this.router.getCurrentNavigation()?.extras.state)
      this.state = this.router.getCurrentNavigation()?.extras.state;
    else
      this.router.navigate(["/login"]);
  }

ngOnInit() {
  this.directores = userData.directors || [];
  this.allMovies = (userData.users || []).reduce((acc: any[], user: any) => {
    return acc.concat(user.movies || []);
  }, []);
}

  getPeliculasDirector(director: any) {
    return this.allMovies.filter(movie => (director.movies || []).includes(movie.id));
  }

  irAHome() {
    this.router.navigate(['/home']);
  }
}
