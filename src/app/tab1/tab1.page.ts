import { Component, OnInit, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { HttpClient } from '@angular/common/http';
import { movieInterface, movieLastest } from '../interfaces/movie';
import { movieTopRated } from '../interfaces/movie';
import { movieAction } from '../interfaces/movie';
import { movieCommedy } from '../interfaces/movie';
import { series } from '../interfaces/movie';

register();
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit {
  movies: movieInterface[] =[]
  moviesTopRated: movieTopRated[] =[]
  movieAction: movieAction[]=[]
  movieCommedy: movieCommedy[]=[]
  movieLastest: movieLastest[]=[]
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMovies()
  }

  loadMovies(){
    this.http.get('https://rotten-tomatoes-backend.up.railway.app/movies').subscribe((data: any) => {
      console.log('movies: ', data.results);
      this.movies = data.results;
    
    });

    this.http.get('https://rotten-tomatoes-backend.up.railway.app/movies/search/latest').subscribe((data: any) => {
      console.log('movies: ', data.results);
      this.movieLastest = data.results;
    
    });  

    this.http.get('https://rotten-tomatoes-backend.up.railway.app/movies/rating/toprated').subscribe((data: any) => {
      console.log('movies: ', data.results);
      this.moviesTopRated = data.results;
    
    });   

    this.http.get('https://rotten-tomatoes-backend.up.railway.app/movies/genre/28').subscribe((data: any) => {
      console.log('movies: ', data.results);
      this.movieAction = data.results;
    
    }); 

    this.http.get('https://rotten-tomatoes-backend.up.railway.app/movies/genre/35').subscribe((data: any) => {
      console.log('movies: ', data.results);
      this.movieCommedy = data.results;
    
    }); 



   
    
  }
}
