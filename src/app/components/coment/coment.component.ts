import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TweetService } from 'src/app/services/tweetService.service';


@Component({
  selector: 'app-coment',
  templateUrl: './coment.component.html',
  styleUrls: ['./coment.component.css']
})
export class ComentComponent implements OnInit {

  @Input() comment: any;


 


  constructor(private nav: NavController, private tweetService: TweetService, private http: HttpClient, private storage: Storage) { }

  ngOnInit() {

  }

  toggleReplyInput(comment: any) {
    comment.showReplyInput = !comment.showReplyInput;
  }
  
  submitReply(comment: any) {
    // Aquí puedes realizar acciones adicionales, como enviar la respuesta al servidor, etc.
    console.log("Reply submitted:", comment.reply);
  
    // Restablece el estado
    comment.reply = '';
    comment.showReplyInput = false;
}



}
