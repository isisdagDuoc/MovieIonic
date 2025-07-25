import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { PeliculaComponent } from '../components/pelicula/pelicula.component';

// angular
import { MatCardModule } from '@angular/material/card';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatCardModule
  ],
  declarations: [HomePage, PeliculaComponent],
  exports: [HomePage, PeliculaComponent],
})
export class HomePageModule {}
