import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { movieTopRated } from '../interfaces/movie';
@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css']
})
export class TopRatedComponent implements OnInit {

  constructor(private http: HttpClient) { }

  moviesTopRated: movieTopRated[] =[]
  ngOnInit() {
    this.http.get('https://rotten-tomatoes-backend.up.railway.app/movies/rating/toprated').subscribe((data: any) => {
      console.log('movies Toprated: ', data.results);
      this.moviesTopRated = data.results;
    
    });  
  }

}
