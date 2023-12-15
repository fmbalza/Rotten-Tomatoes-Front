import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { movieInterface } from '../interfaces/movie';
@Component({
  selector: 'app-Movies',
  templateUrl: './Movies.component.html',
  styleUrls: ['./Movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  movies: movieInterface[] =[]
  ngOnInit() {
    this.http.get('https://rotten-tomatoes-backend.up.railway.app/movies').subscribe((data: any) => {
      console.log('movies Toprated: ', data.results);
      this.movies = data.results;
    
    });  
  }
}
