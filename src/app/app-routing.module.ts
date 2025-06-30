import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'peliculas',
    loadChildren: () => import('./peliculas/peliculas.module').then(m => m.PeliculasPageModule)
  },
  {
    path: 'comentarios',
    loadChildren: () => import('./comentarios/comentarios.module').then(m => m.ComentariosPageModule)
  },
  {
    path: 'directores',
    loadChildren: () => import('./directores/directores.module').then(m => m.DirectoresPageModule)
  },
  {
    path: 'agregar',
    loadChildren: () => import('./pages/agregar/agregar.module').then(m => m.AgregarPageModule)
  },
  {
    path: 'modificar',
    loadChildren: () => import('./pages/modificar/modificar.module').then(m => m.ModificarPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
