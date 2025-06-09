import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { userData } from 'src/assets/mocks/fakeData';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  username: String = '';
  peliculas: Array<any> = [];
  state: any;

  constructor(private router: Router) {
    if(this.router.getCurrentNavigation()?.extras.state)
      this.state = this.router.getCurrentNavigation()?.extras.state;
    else
      this.router.navigate(["/login"]);
  }

  ngOnInit() {
    console.log(this.state, '<<<');
    this.username = this.state['username'];

    console.log(this.username, '<<<');


  for(let user of userData.users) {
    console.log('Comparando:', user.name, this.username);
    if(user.name === this.username && user.movies) {
      this.peliculas = user.movies;
      break;
    }
  }
    console.log(this.peliculas);
  }


}
