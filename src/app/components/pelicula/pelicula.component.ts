import { Component, OnInit, Input,  AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { userData } from '../../../assets/mocks/fakeData';
import { NavigationExtras, Router } from '@angular/router';
import { createAnimation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular/standalone';



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

  constructor(private router: Router, private animationCtrl: AnimationController) {}

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
  }

    private animation!: Animation;

  @ViewChild('cardanimacion', { static: true }) cardAnimacion!: ElementRef;

  ngAfterViewInit() {
    const animation = createAnimation()
      .addElement(this.cardAnimacion.nativeElement)
       .duration(3000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, width: '80px' },
        { offset: 0.72, width: 'var(--width)' },
        { offset: 1, width: '240px' },
      ]);
  }


  irADetallePelicula() {
    this.animation.play();
    this.router.navigate(['/peliculas/' + this.id], { state: this.state });
  }

}
