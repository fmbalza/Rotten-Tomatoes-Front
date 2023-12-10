import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TweetService } from 'src/app/services/tweetService.service';
import { response } from 'express';



@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent  implements OnInit {
  @Input() movie: any;
  constructor(private nav: NavController,  private movieService: TweetService ,private http: HttpClient, private storage: Storage) { }

  ngOnInit() {
    
    
  }

  removeSlashFromUrl(url: string): string {
    if (url.startsWith('/')) {
      return url.substring(1);
    }
    return url;
  }


  async navi(id:any){

    // const _id = this.tweet._id
    await this.movieService.saveIdMovie(id)
      this.nav.navigateForward("/movieDetailed")
        
  
    }
  
}
