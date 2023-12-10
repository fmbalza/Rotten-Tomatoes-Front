import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie/movie.component';
import { ComentComponent } from './coment/coment.component';


@NgModule({
  declarations: [MovieComponent, ComentComponent],
  imports: [
    CommonModule
  ],
  exports:[MovieComponent, ComentComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedComponentsModule { }
