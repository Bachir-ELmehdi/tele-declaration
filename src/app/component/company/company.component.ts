import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/model/Company/company';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from 'src/app/service/user-data.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  id:number ;
  test:number;
  company:Company = new Company(0,"","","","","",[]);
  constructor(private route:ActivatedRoute,
              private router:Router,
              private dataUser:UserDataService) { }
  

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.test=this.route.snapshot.params['test'];
    if(this.test==0){
      this.dataUser.findCompanyById(this.id).subscribe(data=>this.company=data);

    }
  }
  //**Action Company "Add" or "Update"****************************************************/
  saveCompanyOfUser(){
    //Add Company to List companies of User **********************************************/
    if(this.test==-1){
       this.dataUser.addCompany(this.id,this.company).subscribe(data=> console.log(data));
       this.router.navigate(['component/companies-manage']);
    }
    //Update Company By id User and Object Company*****************************************/
    else{
      this.dataUser.updateCompany(this.id,this.company).subscribe(data=> console.log(data));
      this.router.navigate(['component/companies-manage']);
    }
    //**************************************************************************************/
  }

}
