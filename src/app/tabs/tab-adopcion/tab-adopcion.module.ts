import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabAdopcionPageRoutingModule } from './tab-adopcion-routing.module';

import { TabAdopcionPage } from './tab-adopcion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabAdopcionPageRoutingModule
  ],
  declarations: [TabAdopcionPage]
})
export class TabAdopcionPageModule {}
