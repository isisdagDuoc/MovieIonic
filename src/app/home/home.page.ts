import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { userData } from 'src/assets/mocks/fakeData';
import { ApiserviceService } from '../apiservice.service';


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

  // 
    user: any;
    users: any;
    posts: any;
    post: any = {
      id: null,
      title: "",
      body: "",
      userId: null
    };
    compareWith: any;

  constructor(
    private api: ApiserviceService,
    private router: Router
  ) {
    if(this.router.getCurrentNavigation()?.extras.state)
      this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit() {
    this.username = this.state['username'];


  for(let user of userData.users) {
    if(user.name === this.username && user.movies) {
      this.peliculas = user.movies;
      break;
    }
  }
    console.log(this.peliculas);
  }

    irADirectores() {
    this.router.navigate(['/directores']);
  }

  irAComentarios() {
    this.router.navigate(['/comentarios']);
  }

  getPlaceHolders() {
    this.api.getPlaceHolders().subscribe((data) => {
      this.posts = data;
      console.log("POST: ", this.posts);
    }, (error) => {
      console.error("Error fetching placeholders", error);
    });
  }


}
