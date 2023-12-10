import { Component, OnInit } from '@angular/core';
import { TweetService } from '../services/tweetService.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { movieDetail, Genre } from '../interfaces/movie'; 
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-movieDetailed',
  templateUrl: './movieDetailed.component.html',
  styleUrls: ['./movieDetailed.component.css']
})
export class MovieDetailedComponent implements OnInit {
  private movieId: string;

  genres: Genre[] = [];

  constructor(private movieService: TweetService, private storage: Storage, private http: HttpClient,private nav: NavController) {this.movieId = ''}
  movieDetail: movieDetail={
    id: '',
    original_title: '',
    poster_path: '',
    video: false,
    vote_average: '',
    backdrop_path:'',
    overview:'',
    popularity:'',
    release_date:'',
    original_language:'',
   
}
  async ngOnInit() {
    this. movieDetail={
      id: '',
      original_title: '',
      poster_path: '',
      video: false,
      vote_average: '',
      backdrop_path:'',
      overview:'',
      popularity:'',
      release_date:'',
      original_language:'',
     
  }
  this.cargando()
  }



  async cargando(){
    this.movieId = await this.movieService.getIdMovie();
    console.log('Este es el id de la movie en vista', this.movieId);
    
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.movieId}`
      },
      timeout: 5000
    };
    this.http
    .get(`https://rotten-tomatoes-backend.up.railway.app/movies/${this.movieId}`, httpOptions)
    .pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    )
    .subscribe((response: any) => {
   
      console.log(response)
      this.movieDetail.original_title= response.original_title
      this.movieDetail.poster_path= response.poster_path
      this.movieDetail.backdrop_path= response.backdrop_path
      this.movieDetail.vote_average= response.vote_average
      this.movieDetail.overview= response.overview
      this.movieDetail.popularity= response.popularity
      this.movieDetail.release_date= response.release_date
      this.movieDetail.original_language= response.original_language

      this.genres = response.genres.map((genre: any) => genre.name);
    
     console.log(this.genres)

      
      


    });


  }


  async back(){
    this.movieService.deleteIdMovie();
        this.nav.navigateForward("/tabs/tab1")

  }

}
