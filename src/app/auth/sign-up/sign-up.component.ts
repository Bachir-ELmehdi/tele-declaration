import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User/user';
import { Company } from 'src/app/model/Company/company';
import { UserDataService } from 'src/app/service/user-data.service';
import { Router } from '@angular/router';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { ConfirmedValidator } from './confirmed.validator';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userForm:FormGroup;
  submitted = true;
  name:string="";
  constructor(private userDataService: UserDataService,
    private  router:Router,
    private formBuilder:FormBuilder) { }
  company:Company;
  user:User;
  repeat_password:string;

  ngOnInit(): void {
    // this.company =new Company(0,"","","","","",[])
    // this.user.companies.push(this.company);
    this.user = new User(0,"","","",0,[]);
    this.user.companies[0]= new Company(0,"","","","","",[]);
    this.userForm = this.formBuilder.group({
      username:['',Validators.minLength(6)],
      email:['',Validators.email],
      password:['',Validators.minLength(6)],
      repeat_password:['',Validators.required],
      companyName:['',Validators.required],
      companyAdress:['',Validators.required],
      company_ice:['',Validators.required],
      company_if:['',Validators.required],
      company_rc:['',Validators.required]
    }, { 
      validator: ConfirmedValidator('password', 'repeat_password')
    });
  }
  get f(){
    return this.userForm.controls;
  }
  submitForm(){
    this.submitted = true;
    if(this.userForm.invalid){
      return;
    }
    else{
    alert(JSON.stringify(this.userForm.value));
    this.userDataService.saveUser(this.user).subscribe(data=>{
     console.log(data);
     this.router.navigate(['login']);
    });}
    this.onReset();

  }

  onReset() {
    this.submitted = false;
    this.userForm.reset();
}

}
