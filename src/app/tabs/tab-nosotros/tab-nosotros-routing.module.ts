import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabNosotrosPage } from './tab-nosotros.page';

const routes: Routes = [
  {
    path: '',
    component: TabNosotrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabNosotrosPageRoutingModule {}
