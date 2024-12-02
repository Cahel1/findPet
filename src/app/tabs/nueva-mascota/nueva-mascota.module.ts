import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaMascotaPageRoutingModule } from './nueva-mascota-routing.module';

import { NuevaMascotaPage } from './nueva-mascota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaMascotaPageRoutingModule
  ],
  declarations: [NuevaMascotaPage]
})
export class NuevaMascotaPageModule {}
