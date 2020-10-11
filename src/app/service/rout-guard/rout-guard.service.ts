import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HardAuthenticationService } from '../authentication/hard-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoutGuardService implements CanActivate{

  constructor(private hardAutenticationService:HardAuthenticationService,  
    private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.hardAutenticationService.isUserLogedIn())
      return true;
    else{
     this.router.navigate(['login']);
    return false;}

    
  }
}
