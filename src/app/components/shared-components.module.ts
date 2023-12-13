import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie/movie.component';
import { ComentComponent } from './coment/coment.component';
import { PosterComponent } from './poster/poster.component';


@NgModule({
  declarations: [MovieComponent, ComentComponent, PosterComponent],
  imports: [
    CommonModule
  ],
  exports:[MovieComponent, ComentComponent,PosterComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedComponentsModule { }
