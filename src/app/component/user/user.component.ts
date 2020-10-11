import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User/user';
import { Company } from 'src/app/model/Company/company';
import { DataShareService } from 'src/app/service/Data-Share/data-share.service';
import { UserDataService } from 'src/app/service/user-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from 'src/app/auth/sign-up/confirmed.validator';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  repeat_password:string;
  user:User;
  companies:Company[];
  username:string="";
  userForm:FormGroup;
  submitted = true;
  idCompany:number;
  idUser:number;
  constructor(private dataShare : DataShareService,
              private userData:UserDataService,
              private formBuilder:FormBuilder,
              private router :Router,
              private route:ActivatedRoute)
               {}

  ngOnInit(): void {
    this.user = new User();
    //********Validitors  */
    this.userForm = this.formBuilder.group({
      username:['',Validators.minLength(6)],
      email:['',Validators.email],
      password:['',Validators.minLength(6)],
      repeat_password:['',Validators.required]
     
    }, { 
      validator: ConfirmedValidator('password', 'repeat_password')
    });

    //***********fin validitors */
    this.idUser = this.route.snapshot.params['id'];
    this.dataShare.currentMessage.subscribe(data=>{this.username=data});
    // console.log(this.username,"aywa test");
    this.userData.getCompanies(this.username).subscribe(data=>
        {this.companies=data;
        //  console.log("hnaaaaa",data); 
        });
        //test case Update Or Add
  if(this.idUser!=-1){
    this.userData.getUserById(this.idUser).subscribe(data=>{
      this.user=data;
      console.log("user----",this.user);
    })
  }
  }
  
  //Catch Value of Select Box *********************/
  selectChangeHandler (event: any) {
    //update the ui
    this.idCompany = event.target.value;
    console.log(this.idCompany);
  }
  get f(){
    return this.userForm.controls;
  }
  submitForm(){
    if(this.idUser == -1){//Case: Add user
    this.userData.addUserWithCompany(this.user,this.idCompany).subscribe(data=>{
      console.log(data);
      this.router.navigate(['component/users-manage']);
    });

    }else{//Case Update User
      this.userData.updateSimpleUser(this.user,this.idUser,this.idCompany).subscribe(data=>{
        console.log(data);
      });
    }
}

}
