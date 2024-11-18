import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabAdopcionPage } from './tab-adopcion.page';

const routes: Routes = [
  {
    path: '',
    component: TabAdopcionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabAdopcionPageRoutingModule {}
