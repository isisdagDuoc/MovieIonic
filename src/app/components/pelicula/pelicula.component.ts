import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { createAnimation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.scss'],
  standalone: false,
})
export class PeliculaComponent implements OnInit {
  @Input() id: Number = -1;
  @Input() state: any;
  @Input() pelicula: any;
  movieInfo: any = {};

  constructor(
    private router: Router,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {
    this.movieInfo = this.pelicula;
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

  getImageSrc(imagePath: string): string {
    const cleanPath = imagePath.startsWith('/')
      ? imagePath.substring(1)
      : imagePath;
    return `assets/${cleanPath}`;
  }

  irADetallePelicula() {
    this.router.navigate(['/peliculas/' + this.id], { state: this.state });
  }
}
