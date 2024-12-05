import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabInicialPage } from './tab-inicial.page';

const routes: Routes = [
  {
    path: '',
    component: TabInicialPage,
    children: [
      {
        path: 'tab-home',
        loadChildren: () => import('../tab-home/tab-home.module').then( m => m.TabHomePageModule)
      },
      {
        path: 'tab-adopcion',
        loadChildren: () => import('../tab-adopcion/tab-adopcion.module').then( m => m.TabAdopcionPageModule)
      },
      {
        path: 'tab-nosotros',
        loadChildren: () => import('../tab-nosotros/tab-nosotros.module').then( m => m.TabNosotrosPageModule)
      },
      {
        path: 'nueva-mascota',
        loadChildren: () => import('../nueva-mascota/nueva-mascota.module').then( m => m.NuevaMascotaPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabInicialPageRoutingModule {}
