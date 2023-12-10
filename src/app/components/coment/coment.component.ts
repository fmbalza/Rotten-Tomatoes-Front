import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TweetService } from 'src/app/services/tweetService.service';
import { perfil } from 'src/app/interfaces/user';
import { deleteComment } from 'src/app/interfaces/comment';

@Component({
  selector: 'app-coment',
  templateUrl: './coment.component.html',
  styleUrls: ['./coment.component.css']
})
export class ComentComponent implements OnInit {

  @Input() comment: any;
  @Input() showDeleteButton: boolean = false;

  perfil: perfil = {  
    username: '',
    userId: '', 
  };


  constructor(private nav: NavController, private tweetService: TweetService, private http: HttpClient, private storage: Storage) { }

  ngOnInit() {
    this.perfil = {  
      username: '',
      userId: '', 
    };
  }

}
