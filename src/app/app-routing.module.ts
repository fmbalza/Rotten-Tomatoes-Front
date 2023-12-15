import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MovieDetailedComponent } from './movieDetailed/movieDetailed.component';
import { TopRatedComponent } from './top-rated/top-rated.component';
import { ActionComponent } from './Action/Action.component';
import { ComedyComponent } from './Comedy/Comedy.component';
import { MoviesComponent } from './Movies/Movies.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {    
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'movieDetailed',
    component: MovieDetailedComponent
  },
  {    
    path: 'top-rated',
    component: TopRatedComponent
  },
  {    
    path: 'action',
    component: ActionComponent
  },
  {    
    path: 'comedy',
    component: ComedyComponent
  },
  {    
    path: 'movies',
    component: MoviesComponent
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
