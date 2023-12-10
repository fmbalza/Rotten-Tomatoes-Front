import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { SharedComponentsModule } from '../components/shared-components.module';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { register } from 'swiper/element/bundle';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    SharedComponentsModule,
    Tab1PageRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
