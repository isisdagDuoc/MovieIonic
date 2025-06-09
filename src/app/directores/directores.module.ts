import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectoresPageRoutingModule } from './directores-routing.module';

import { DirectoresPage } from './directores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectoresPageRoutingModule
  ],
  declarations: [DirectoresPage]
})
export class DirectoresPageModule {}
