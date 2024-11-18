import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabAdopcionPage } from './tabs/tab-adopcion/tab-adopcion.page';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'tab-home',
    pathMatch: 'full'
  },
  {
    path: '', loadChildren: () => import('./tabs/tab-inicial/tab-inicial-routing.module').then((m) => m.TabInicialPageRoutingModule),
  },  {
    path: 'tab-home',
    loadChildren: () => import('../app/tabs/tab-home/tab-home.module').then( m => m.TabHomePageModule)
  },
  {
    path: 'tab-inicial',
    loadChildren: () => import('./tabs/tab-inicial/tab-inicial.module').then( m => m.TabInicialPageModule)
  },
  {
    path: 'tab-nosotros',
    loadChildren: () => import('./tabs/tab-nosotros/tab-nosotros.module').then( m => m.TabNosotrosPageModule)
  },
  {
    path: 'tab-perfil',
    loadChildren: () => import('./tabs/tab-perfil/tab-perfil.module').then( m => m.TabPerfilPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
