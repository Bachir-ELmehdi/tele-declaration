import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/service/user-data.service';
import { User } from 'src/app/model/User/user';
import { Company } from 'src/app/model/Company/company';
import { DataShareService } from 'src/app/service/Data-Share/data-share.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users-manage',
  templateUrl: './users-manage.component.html',
  styleUrls: ['./users-manage.component.css']
})
export class UsersManageComponent implements OnInit {
  message:string="";
  users:User[];
  companies:Company[];
  idCompany:number;
  username:string;
  constructor(private router:Router,
              private dataShare:DataShareService,
              private userdataService:UserDataService,
              private httpclient :HttpClient) { }

  ngOnInit(): void {
    this.dataShare.currentMessage.subscribe(data=>{this.username=data});
    // console.log(this.username,"aywa test");
    this.userdataService.getCompanies(this.username).subscribe(data=>
        {this.companies=data;
        //  console.log("hnaaaaa",data); 
        });
  }
  selectChangeHandler (event: any) {
    //update the ui
    this.idCompany = event.target.value;
    this.refreshData();
    console.log(this.idCompany);
  }
 

 deleteUser(id:number){
   this.userdataService.deletSimpleUser(id,this.idCompany).subscribe(data=>{
     console.log(data);
     this.refreshData();
   });

 }
 updateUser(id:number){
  this.router.navigate(['component/user',id]);

 }

 addUser(){
   this.router.navigate(['component/user/',-1]);

 }

 sendEmail(user:User){

   console.log("9rib",user);
  this.userdataService.sendEmail(user).subscribe(data=>{
    alert("bien");
  });
 }
 refreshData(){
  this.userdataService.getAllUsersByCompany(this.idCompany).subscribe(data=>{
    this.users=data;
    console.log("-----test-----",this.users);
  });
 }

}
