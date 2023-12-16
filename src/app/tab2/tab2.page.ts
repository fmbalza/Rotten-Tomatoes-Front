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

  showFilters = false;

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  // propiedades para el buscador
  movies: movies[] = [];
  textoBuscar ='';

  // propiedades para los filtros
  selectedGenre: string = '';
  selectedYear: number = 0;
  selectedDuration: number = 0;
  selectedSortBy: string = '';
  selectedType: string = ''; // pelicula o serie

  // opciones para el filtro SortBy
  sortByOptions: { label: string, value: string }[] = [
    { label: 'Descending popularity', value: 'popularity.desc' },
    { label: 'Ascending popularity', value: 'popularity.asc' },
    { label: 'Descending revenue', value: 'revenue.desc' },
    { label: 'Ascending revenue', value: 'revenue.asc' },
    { label: 'Descending release date', value: 'primary_release_date.desc' },
    { label: 'Ascending release date', value: 'primary_release_date.asc' },
    { label: 'Descending vote average', value: 'vote_average.desc' },
    { label: 'Ascending vote average', value: 'vote_average.asc' },
    { label: 'Descending vote count', value: 'vote_count.desc' },
    { label: 'Ascending vote count', value: 'vote_count.asc' }
  ];

  constructor(private http: HttpClient, private storage: Storage, private nav: NavController, private movieService: TweetService) {}
  ngOnInit(): void {
    this.movies = [];
    
    
  }


  searchMovies( event: any){
     this.textoBuscar = event.detail.value
     console.log(this.textoBuscar); 
     this.http
      .get(`https://rotten-tomatoes-backend.up.railway.app/movies/search/${this.textoBuscar}`)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      )
      .subscribe((response: any) => {
          console.log(response);
          this.movies = response;
         
      });
          
  }

  // metodo para aplicar los filtros
  applyFilters() {
    const filters = {
      genre: this.selectedGenre,
      duration: this.selectedDuration,
      year: this.selectedYear,
      sortBy: this.selectedSortBy
    };

    if(this.selectedType === 'movie') {

      this.http.post('https://rotten-tomatoes-backend.up.railway.app/movies/discovery', filters)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      )
      .subscribe((response: any) => {
        console.log(response);
        this.movies = response.results;
      });
    } else if (this.selectedType === 'serie') {
      this.http.post('https://rotten-tomatoes-backend.up.railway.app/series/discovery', filters)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      )
      .subscribe((response: any) => {
        console.log(response);
        this.movies = response.results;
      });
    }


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
