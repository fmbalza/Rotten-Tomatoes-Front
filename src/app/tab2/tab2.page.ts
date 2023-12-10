import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { movies } from '../interfaces/movie';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { TweetService } from 'src/app/services/tweetService.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  movies: movies[] = [];
  textoBuscar ='';
  constructor(private http: HttpClient, private storage: Storage, private nav: NavController, private movieService: TweetService) {}
  ngOnInit(): void {
    this.movies = [];
    
    this.http
      .get(`https://rotten-tomatoes-backend.up.railway.app/movies`)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      )
      .subscribe((response: any) => {
        console.log("Esto es de la barra de busqueda",response.results.map((movie: any) => movie.id));
          this.movies=response.results;
         
          
      });
  }


  searchUsers( event: any){
            this.textoBuscar = event.detail.value           
  }

  async goToMovieDetails(id: any) {
  
    try {
      await this.movieService.saveIdMovie(id);
      this.nav.navigateForward("/movieDetailed");
    } catch (error) {
      console.log(error);
    }
      
  
  }





}
