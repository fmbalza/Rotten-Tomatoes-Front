import { Component, OnInit, HostListener } from '@angular/core';
import { existinguser } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { response } from 'express';
import { HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

  showPassword: boolean = false;
    existinguser: existinguser={
      username:'',
      password:''
    }
    constructor( private http: HttpClient, private nav: NavController, private authService: AuthService) {}

    ngOnInit(): void {
      this.existinguser={
        username:'',
        password:''
    
      }
    }

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    
  }
  
  async signIn() {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
    // Asegúrate de configurar el origen correcto aquí
      })
    };


   await this.http.post('https://rotten-tomatoes-backend.up.railway.app/signin', this.existinguser, httpOptions).pipe(catchError( (error)=>{
    console.log(error)
    return throwError(error)
   })).subscribe((response:any) => {
    console.log(response)

    const {token, userID} = response
  

    this.authService.saveToken(token);
    this.authService.saveToken(userID);

    this.nav.navigateForward("/tabs/tab1")
  })
  



}}

