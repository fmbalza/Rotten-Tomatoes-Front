import { Component, OnInit, assertNotInReactiveContext } from '@angular/core';
import { TweetService } from '../services/tweetService.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { movieDetail, Genre } from '../interfaces/movie'; 
import { NavController } from '@ionic/angular';
import { comment, createrating } from '../interfaces/comment';
import { createComment } from '../interfaces/comment';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-movieDetailed',
  templateUrl: './movieDetailed.component.html',
  styleUrls: ['./movieDetailed.component.css']
})
export class MovieDetailedComponent implements OnInit {
  private ratingKey: string
  private movieId: string;
  comments: comment[] =[]
  genres: Genre[] = [];

  constructor( private alertCtlr: AlertController, private authService: AuthService, private movieService: TweetService, private storage: Storage, private http: HttpClient,private nav: NavController) {this.movieId = '', this.ratingKey= '' }
  movieDetail: movieDetail={
    id: '',
    title: '',
    img: '',
    description:'',
    publicRating: '',
    criticRating: '',
}

    createComment:createComment= {
      
      apiId:'',
      userId:'',
      text:'',
    }
    createrating:createrating= {
      
      apiId:'',
      userId:'',
      rating:0,
    }

  async ngOnInit() {
    this. movieDetail={
      id: '',
      title: '',
      img: '',
      description:'',
      publicRating: '',
      criticRating: '',
  }
  this.createComment= {
      
    apiId:'',
    userId:'',
    text:'',
  }

  this.createrating= {
      
    apiId:'',
    userId:'',
    rating:0,
  }
  // this.ratingKey = `rating_${this.movieId}`;

  this.storage.get('userID').then((user) => {
    this.storage.get('token').then((token) => {
      // Aquí puedes utilizar el token y el userID para crear el tweet
      this.createComment.userId=token
      this.createrating.userId=token
      console.log('UserId:', this.createComment.userId);
    
    });
  });

//   const storedRating = localStorage.getItem(this.ratingKey);
//   console.log(' ratingKey ', this.ratingKey)
// if (storedRating) {
//   this.createrating.rating = parseInt(storedRating, 10);
// }
//   console.log( 'sexo:',storedRating)

//   if (storedRating) {
//     // Establecer la calificación en los elementos input radio correspondientes
//     const radioButtons = Array.from(document.querySelectorAll('input[name="califica"]')) as HTMLInputElement[];
//     radioButtons.forEach((radio: Element) => {
//       if (radio instanceof HTMLInputElement && radio.value === storedRating) {
//         radio.checked = true;
//       }
//     });
//   }



  this.cargando()
  this.loadComments()
  }



  async cargando(){
    this.movieId = await this.movieService.getIdMovie();
    console.log('Este es el id de la movie en vista', this.movieId);
    
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.movieId}`
      },
      timeout: 5000
    };
    this.http
    .get(`https://rotten-tomatoes-backend.up.railway.app/movies/${this.movieId}`, httpOptions)
    .pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    )
    .subscribe((response: any) => {
   
      
      
      // console.log(response)
      // this.movieDetail.title= response.title
      // this.movieDetail.img= response.image
      // this.movieDetail.description= response.description
      // this.movieDetail.id= response.apiId
      // this.movieDetail.publicRating=  parseFloat(response.publicRating.average).toFixed(1)
      // this.movieDetail.criticRating=  parseFloat(response.criticRating.average).toFixed(1)
      // console.log('apiId:',this.movieDetail.id)
      
      // this.genres = response.genres.map((genre: any) => genre.name);
      // console.log(this.genres)
      
      


    });

    this.http
    .get(`https://rotten-tomatoes-backend.up.railway.app/movies/23823`, httpOptions)
    .pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    )
    .subscribe((response: any) => {
   
      
      
      console.log(response)
      this.movieDetail.title= response.title
      this.movieDetail.img= response.image
      this.movieDetail.description= response.description
      this.movieDetail.id= response.apiId
      this.movieDetail.publicRating=  parseFloat(response.publicRating.average).toFixed(1)
      this.movieDetail.criticRating=  parseFloat(response.criticRating.average).toFixed(1)
      console.log('apiId:',this.movieDetail.id)
      
      this.genres = response.genres.map((genre: any) => genre.name);
      console.log(this.genres)
      
      


    });


  }

  async loadComments(){
    this.movieId = await this.movieService.getIdMovie();
 
    console.log('Este es el id de la movie en vista', this.movieId);
    this.http.get(`https://rotten-tomatoes-backend.up.railway.app/movies/23823/comments`).subscribe((data: any) => {
      console.log('comments: ', data);
      this.comments = data;
      
    });
  }


  async back(){
    this.movieService.deleteIdMovie();
        this.nav.navigateForward("/tabs/tab1")

  }





  async createCommentt() {

    if (!this.createComment.text) {
      // Mostrar un mensaje de error o realizar otra acción apropiada
      console.log('El campo de texto está vacío');

      const alert = await this.alertCtlr.create({
        cssClass: 'alert',
        header: 'Alert',
 
        message: 'Please fill in all fields',
        buttons: ['OK']
      });
      await alert.present();

      return;
    }
    
   
      this.createComment.apiId =  this.movieDetail.id
    await this.http.post(`https://rotten-tomatoes-backend.up.railway.app/movies/23823/comments`, this.createComment).pipe(catchError( (error)=>{
     console.log(error)
     return throwError(error)
    })).subscribe((response) => {
     console.log(response)

   
    

      this.loadComments()

  })
  }


  async createRatingg() {

    const selectedRating = document.querySelector('input[name="califica"]:checked') as HTMLInputElement;

    if (!selectedRating) {
      // Mostrar un mensaje de error o realizar otra acción apropiada
      console.log('El campo de texto está vacío');

   

      const alert = await this.alertCtlr.create({
        cssClass: 'alert',
        header: 'Alert',
 
        message: 'Please fill in all fields',
        buttons: ['OK']
      });
      await alert.present();

      return;
    }

    this.createrating.rating = parseInt(selectedRating.value, 10);
    console.log(' ratingKey ', this.ratingKey)
  
    localStorage.setItem(this.ratingKey, this.createrating.rating.toString());






    console.log( "ratificacion",this.createrating.rating, typeof(this.createrating.rating) )











      this.createrating.apiId =  this.movieDetail.id
    await this.http.post(`https://rotten-tomatoes-backend.up.railway.app/movies/23823/rating`, this.createrating).pipe(catchError( (error)=>{
     console.log(error)
     return throwError(error)
    })).subscribe((response) => {
     console.log(response)

   
    

      

  })
  }


}
