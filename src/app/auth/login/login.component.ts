import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/service/user-data.service';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/service/Data-Share/data-share.service';
import { HardAuthenticationService } from 'src/app/service/authentication/hard-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted=true;
  invalideLogin:boolean;
  username:string;
  password:string;
  
  constructor(private formBuilder:FormBuilder,
    private userDataService: UserDataService,
    private  router:Router,
    private dataShare:DataShareService,
    private authService:HardAuthenticationService) { }

    get f(){
      return this.loginForm.controls;
    }
  ngOnInit(): void {
    this.loginForm  = this.formBuilder.group({
      username:['',Validators.minLength(6)],
      password:['',Validators.minLength(6)]

    });
  }
  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    else{
    this.userDataService.testLoginUser(this.username,this.password).subscribe(data=>{
     console.log(data);
    if(data>0)
    { this.authService.autenticate(this.username);
      this.dataShare.changeMessage(this.username);
      this.router.navigate(['dashboard']);
      
    }
    else{
         this.invalideLogin = true;
    }
    });
    // console.log(this.authService.autenticate(this.username,this.password));
    // if(this.authService.autenticate(this.username,this.password)){
    //    this.dataShare.changeMessage(this.username);
    //    this.router.navigate(['dashboard']);
    // }
  }
    }
    
  

}
