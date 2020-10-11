import { Injectable } from '@angular/core';
import { UserDataService } from '../user-data.service';

@Injectable({
  providedIn: 'root'
})
export class HardAuthenticationService {

  constructor(private dataUser:UserDataService) { }
  autenticate(username:string){
    console.log("from autenticaterService",username);
    sessionStorage.setItem('autenticater',username);
   
  }

  isUserLogedIn(){
    let user = sessionStorage.getItem('autenticater');

    return !(user === null);
  }
  logout(){
    sessionStorage.removeItem('autenticater');
  }
}
