import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabHomePageRoutingModule } from './tab-home-routing.module';
import { TabHomePage } from './tab-home.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabHomePageRoutingModule
  ],
  declarations: [TabHomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabHomePageModule {}
