import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirectoresPage } from './directores.page';

const routes: Routes = [
  {
    path: '',
    component: DirectoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectoresPageRoutingModule {}
