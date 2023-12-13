import { Component, OnInit } from '@angular/core';
import { newUser } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { response } from 'express';
import { HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  constructor(  private alertCtrl: AlertController ,private http: HttpClient, private nav: NavController) {}

  newuser: newUser = {       
    
    email: '',
    username: '' ,
    password:'' ,
    name: '',
    lastname:'' ,
  }

  ngOnInit() {

    this.newuser= {           
      email: '',
      username: '' ,  
      password:'' ,
      name: '',
      lastname:''}
    }
   async signUp() {
    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (
      !this.newuser.email ||
      !this.newuser.username ||
      !this.newuser.password ||
      !this.newuser.name ||
      !this.newuser.lastname
    ) {
      console.log('Uno o más campos están vacíos');
      const alert = await this.alertCtrl.create({
        cssClass: 'alert',
        header: 'Alert',
    
        message: 'Please fill in all fields',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    if (!emailPattern.test(this.newuser.email)) {
      // El correo electrónico no tiene una estructura válida
      console.log('El correo electrónico no es válido');
      const alert = await this.alertCtrl.create({
        cssClass: 'alert',
        header: 'Alert',
        subHeader: 'Subtitle',
        message: 'You have entered an invalid email address',
        buttons: ['OK']
      }) 
      await alert.present();


      return;
    }



    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
    // Asegúrate de configurar el origen correcto aquí
      })
    };

    // if (this.newuser.profileImg !== '') {
    //    const blob = this.dataURLtoBlob(this.newuser.profileImg as string);
    //   const url = await this.uploadPicture(blob, this.test);
    
    //   this.newuser.profileImg = url;
    //    console.log(this.newuser);
    // }



   await this.http.post('https://rotten-tomatoes-backend.up.railway.app/signup', this.newuser, httpOptions).pipe(catchError( (error)=>{
    console.log(error)
    return throwError(error)
   })).subscribe((response) => {
    console.log(response)



    this.nav.navigateForward("/login")
  })

   console.log(this.newuser)
  }
}
