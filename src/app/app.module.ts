import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { SharedComponentsModule } from './components/shared-components.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { MovieDetailedComponent } from './movieDetailed/movieDetailed.component';
import { TopRatedComponent } from './top-rated/top-rated.component';
import { ActionComponent } from './Action/Action.component';
import { ComedyComponent } from './Comedy/Comedy.component';
import { MoviesComponent } from './Movies/Movies.component';

@NgModule({
  declarations: [								AppComponent,
      LoginComponent,
      RegisterComponent,
      MovieDetailedComponent,
      TopRatedComponent,
      ActionComponent,
      ComedyComponent,
      MoviesComponent
   ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,IonicStorageModule.forRoot(), CommonModule, FormsModule,SharedComponentsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
