import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaMascotaPage } from './nueva-mascota.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaMascotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaMascotaPageRoutingModule {}
