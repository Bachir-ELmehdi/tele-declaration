import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/model/Company/company';
import { DataShareService } from 'src/app/service/Data-Share/data-share.service';
import { UserDataService } from 'src/app/service/user-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-companies-manage',
  templateUrl: './companies-manage.component.html',
  styleUrls: ['./companies-manage.component.css']
})
export class CompaniesManageComponent implements OnInit {

  message:string="";
  companies:Company[];
  username:string;
  idUser:number;
  constructor(private shareData:DataShareService,
              private userData:UserDataService,
              private router:Router) { }

  ngOnInit(): void {
    this.shareData.currentMessage.subscribe(data=> this.username=data); 
    this.refreshCompanies();
    //Catch UserName By DAta SHare Service  
    this.userData.getIdUser(this.username).subscribe(data=> this.idUser = data);
      
  }

  //Delet Compay BY ID //***********************************************************************/
  deleteCompany(id){
    this.userData.removeCompany(this.idUser,id).subscribe(data=>console.log(data));
    this.message="Company Deleted";
    this.refreshCompanies();
    this.router.navigate(['component/companies-manage']);
  }
  //********************************************************************************************/

  
  //Update Company By ID and redirect to Company //*********************************************/
  updateCompany(id:number){
    this.router.navigate(['component/company',id,0]);  
    // console.log("company ID",id);
  }
//**********************************************************************************************/

  //Add New Company By Updating List companies Of Users  //*************************************/
  AddCompany(){
   this.router.navigate(['component/company',this.idUser,-1]);  
   this.refreshCompanies();

  }
  //*********************************************************************************************/

  //Refresh DAta of Companies //*****************************************************************/
  refreshCompanies(){
    this.userData.getCompanies(this.username).subscribe(data=> {
      this.companies=data;
    });
  }
//************************************************************************************************/

}

