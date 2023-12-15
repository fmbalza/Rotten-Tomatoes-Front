import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { movieCommedy } from '../interfaces/movie';
@Component({
  selector: 'app-Comedy',
  templateUrl: './Comedy.component.html',
  styleUrls: ['./Comedy.component.css']
})
export class ComedyComponent implements OnInit {

  constructor(private http: HttpClient) { }

  movieCommedy: movieCommedy[] =[]
  ngOnInit() {
    this.http.get('https://rotten-tomatoes-backend.up.railway.app/movies/discover/35').subscribe((data: any) => {
      console.log('movies Toprated: ', data.results);
      this.movieCommedy = data.results;
    
    });  
  }

}
