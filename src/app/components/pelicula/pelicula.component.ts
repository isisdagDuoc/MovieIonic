import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/dataservice.service';
import { PeliculaCatalogo } from '../../services/DB/models/pelicula-catalogo';
import { AnimationController, Animation } from '@ionic/angular';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.scss'],
  standalone: false,
})
export class PeliculaComponent implements OnInit, AfterViewInit {
  @Input() set pelicula(value: PeliculaCatalogo | null) {
    if (value) {
      this.movieInfo = value;
      this.peliculaRecibidaDirecta = true;
    }
  }

  @Input() id?: number;

  @Input() state: any;

  @ViewChild('cardanimacion', { read: ElementRef }) cardElement!: ElementRef<HTMLElement>;

  movieInfo: PeliculaCatalogo | null = null;
  private peliculaRecibidaDirecta = false;
  private cardAnimation!: Animation | null;

  constructor(private router: Router, private ds: DataService, private animationCtrl: AnimationController) {}

  async ngOnInit() {
    await this.ds.init();

    if (this.peliculaRecibidaDirecta && this.movieInfo) {
      return;
    }

    if (this.id != null) {
      const catalogo = await this.ds.obtenerPeliculasCatalogo();
      this.movieInfo = catalogo.find((p) => p.id === this.id) || null;
    }

    if (!this.movieInfo) {
      console.warn('[PeliculaComponent] No se pudo obtener la película.');
    }
  }

  ngAfterViewInit() {
    this.cardAnimation = this.cardElement
      ? this.animationCtrl
          .create()
          .addElement(this.cardElement.nativeElement)
          .fill('none')
          .duration(1000)
          .keyframes([
            { offset: 0, transform: 'scale(1)', opacity: '1' },
            { offset: 0.3, transform: 'scale(1.07)', opacity: '0.3' },
            { offset: 0.3, transform: 'scale(1)', opacity: '1' },
          ])
      : null;
  }

  async irADetallePelicula() {
    if (!this.movieInfo) return;

    await this.playCardAnimation();

    this.router.navigate(['/peliculas/' + this.movieInfo.id], {
      state: {
        ...this.state,
        pelicula: this.movieInfo,
      },
    });
  }

  async playCardAnimation() {
    await this.cardAnimation?.play();
  }

  pauseCardAnimation() {
    this.cardAnimation?.pause();
  }

  async stopCardAnimation() {
    await this.cardAnimation?.stop();
  }

  async animateCard() {
    await this.playCardAnimation();
  }

  getImageSrc(path: string | undefined) {
    if (!path) return 'assets/images/default.jpg';
    const clean = path.startsWith('/') ? path.substring(1) : path;
    return `assets/images/${clean}`;
  }
}
