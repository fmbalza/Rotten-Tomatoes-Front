import { Component, OnInit, assertNotInReactiveContext } from '@angular/core';

import { SerieService } from '../services/serieService.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { serieDetail, Genre } from '../interfaces/movie'; 
import { NavController } from '@ionic/angular';
import { comment, createrating } from '../interfaces/comment';
import { createComment } from '../interfaces/comment';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { movieAction } from '../interfaces/movie';

@Component({
  selector: 'app-serieDetailed',
  templateUrl: './serieDetailed.component.html',
  styleUrls: ['./serieDetailed.component.css']
})
export class SerieDetailedComponent implements OnInit {
  private ratingKey: string
  private serieId: string;
   public trailer1Url : SafeResourceUrl 
   public trailer2Url : SafeResourceUrl 
   public trailer3Url : SafeResourceUrl 
  comments: comment[] = []
  genres: Genre[] = [];
  constructor( private serieService: SerieService,public sanitizer: DomSanitizer ,private alertCtlr: AlertController, private authService: AuthService, private storage: Storage, private http: HttpClient,private nav: NavController) { this.trailer3Url='',this.trailer2Url='',this.trailer1Url='',this.serieId = '', this.ratingKey= '' }

  serieDetail: serieDetail={
    id: '',
    name: '',
    img: '',
    description:'',
    publicRating: '',
    criticRating: '',
    seasons:'',
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


    movieAction: movieAction[] =[]

  async ngOnInit() {



    this.serieDetail={
      id: '',
      name: '',
      img: '',
      description:'',
      publicRating: '',
      criticRating: '',
      seasons:'',
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


  this.storage.get('userID').then((user) => {
    this.storage.get('token').then((token) => {
  
      this.createComment.userId=token
      this.createrating.userId=token
     
    
    });
  });

 




  this.cargando()
  this.loadComments()
  
  }



  async cargando(){
    this.serieId = await this.serieService.getIdSerie();
  
    this.http.get(`https://rotten-tomatoes-backend.up.railway.app/series/${this.serieId}/similar`).subscribe((data: any) => {
      console.log('series Toprated: ', data.results);
      this.movieAction = data.results;
    }); 
    
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${this.serieId}`
      },
      timeout: 5000
    };
    this.http
    .get(`https://rotten-tomatoes-backend.up.railway.app/series/${this.serieId}`, httpOptions)
    .pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    )
    .subscribe((response: any) => {
   

    });
    this.http
    .get(`https://rotten-tomatoes-backend.up.railway.app/series/${this.serieId}`, httpOptions)
    .pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    )
    .subscribe((response: any) => {
   

    });
    this.http
    .get(`https://rotten-tomatoes-backend.up.railway.app/series/${this.serieId}`, httpOptions)
    .pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    )
    .subscribe((response: any) => {
   

    });
    this.http
    .get(`https://rotten-tomatoes-backend.up.railway.app/series/${this.serieId}`, httpOptions)
    .pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    )
    .subscribe((response: any) => {
   
      console.log(response)

      this.serieDetail.name= response.title
      this.serieDetail.img= response.image
      this.serieDetail.description= response.description
      this.serieDetail.id= response.apiId
      this.serieDetail.publicRating=  parseFloat(response.publicRating.average).toFixed(1)
      this.serieDetail.criticRating=  parseFloat(response.criticRating.average).toFixed(1)
     this.serieDetail.seasons= response.seasons.length
     console.log((this.serieDetail.seasons))
      
      this.genres = response.genres.map((genre: any) => genre.name);
   

    });


  }

  async loadComments(){
    this.serieId = await this.serieService.getIdSerie();
 
    console.log('Este es el id de la movie en vista', this.serieId);
    this.http.get(`https://rotten-tomatoes-backend.up.railway.app/series/${this.serieId}/comments`).subscribe((data: any) => {
  
      this.comments = data;
      
    });
  }


  async back(){
    this.serieService.deleteIdSerie();
        this.nav.navigateForward("/tabs/tab1")

  }





  async createCommentt() {

    if (!this.createComment.text) {
      // Mostrar un mensaje de error o realizar otra acción apropiada
  

      const alert = await this.alertCtlr.create({
        cssClass: 'alert',
        header: 'Alert',
 
        message: 'Please fill in all fields',
        buttons: ['OK']
      });
      await alert.present();

      return;
    }
    
   
      this.createComment.apiId =  this.serieDetail.id
    await this.http.post(`https://rotten-tomatoes-backend.up.railway.app/series/${this.serieId}/comments`, this.createComment).pipe(catchError( (error)=>{
     console.log(error)
     return throwError(error)
    })).subscribe((response) => {


      this.loadComments()
  })
  }

  handleRefresh( event:any) {
    this.loadComments();
    event.target.complete();
  }


  async createRatingg() {

    const selectedRating = document.querySelector('input[name="califica"]:checked') as HTMLInputElement;

    if (!selectedRating) {
      // Mostrar un mensaje de error o realizar otra acción apropiada
      

   

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

  
    localStorage.setItem(this.ratingKey, this.createrating.rating.toString());



      this.createrating.apiId =  this.serieDetail.id
    await this.http.post(`https://rotten-tomatoes-backend.up.railway.app/series/${this.serieId}/rating`, this.createrating).pipe(catchError( (error)=>{
     console.log(error)
     return throwError(error)
    })).subscribe((response) => {
   
  })
  }





  async goToSerieDetails(id: any) {
  
    try {
      await this.serieService.saveIdSerie(id);
      this.nav.navigateForward("/serieDetailed");
    
      this.cargando()
      this.loadComments()
      
    } catch (error) {
      console.log(error);
    }
        
  }

}

