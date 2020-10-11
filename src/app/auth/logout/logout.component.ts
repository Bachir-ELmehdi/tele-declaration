import { Component, OnInit } from '@angular/core';
import { HardAuthenticationService } from 'src/app/service/authentication/hard-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private hardAuth:HardAuthenticationService,
    private router :Router) { }

  ngOnInit(): void {
    this.router.navigate(['login']);
    this.hardAuth.logout();
    
  }

}
