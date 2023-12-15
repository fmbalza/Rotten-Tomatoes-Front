import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { movieAction } from '../interfaces/movie';
@Component({
  selector: 'app-Action',
  templateUrl: './Action.component.html',
  styleUrls: ['./Action.component.css']
})
export class ActionComponent implements OnInit {

  constructor(private http: HttpClient) { }

  movieAction: movieAction[] =[]
  ngOnInit() {
    this.http.get('https://rotten-tomatoes-backend.up.railway.app/movies/discover/28').subscribe((data: any) => {
      console.log('movies Toprated: ', data.results);
      this.movieAction = data.results;
    
    });  
  }

}
