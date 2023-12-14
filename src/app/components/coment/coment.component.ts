import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TweetService } from 'src/app/services/tweetService.service';
import { replyy, comment } from 'src/app/interfaces/comment';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coment',
  templateUrl: './coment.component.html',
  styleUrls: ['./coment.component.css']
})
export class ComentComponent implements OnInit {

  @Input() comment: any;
  private movieId: string;
  comments: comment[] =[]
  replyy:replyy= {
      
    commentId:'',
    userId:'',
    text:'',
  }
 


  constructor(private movieService: TweetService,private alertCtlr: AlertController, private nav: NavController, private tweetService: TweetService, private http: HttpClient, private storage: Storage) { this.movieId = '' }

  ngOnInit() {
    this.replyy = {
      commentId: '',
      userId: '',
      text: '',
    };


    this.storage.get('userID').then((user) => {
      this.storage.get('token').then((token) => {
        // Aquí puedes utilizar el token y el userID para crear el tweet
        this.replyy.userId=token

        console.log('UserId:', this.replyy.userId);
      
      });
    });
   
  }

  toggleReplyInput(comment: any) {
    comment.showReplyInput = !comment.showReplyInput;
  }
  
  async createReply() {

    if (!this.replyy.text) {
      // Mostrar un mensaje de error o realizar otra acción apropiada
      console.log(this.replyy.text);

      const alert = await this.alertCtlr.create({
        cssClass: 'alert',
        header: 'Alert',
 
        message: 'Please fill in all fields',
        buttons: ['OK']
      });
      await alert.present();

      return;
    }
    
   

    await this.http.post(`https://rotten-tomatoes-backend.up.railway.app/comments/${this.comment._id}/replies`, this.replyy).pipe(catchError( (error)=>{
     console.log(error)
     return throwError(error)
    })).subscribe((response) => {
     console.log(response)

   



     // Restablece el estado
     this.replyy.text = '';
     this.comment.showReplyInput = false;

  })
  }
  
  toggleSendReplyInput(comment: any) {
    comment.showSendReplyInput = !comment.showSendReplyInput;
    // Restablece el contenido del área de texto cuando se oculta
    if (!comment.showSendReplyInput) {
      this.replyy.text = '';
    }
  }

  
}
