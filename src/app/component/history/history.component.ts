import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/model/Invoice/invoice';
import { UserDataService } from 'src/app/service/user-data.service';
import { Company } from 'src/app/model/Company/company';
import { DataShareService } from 'src/app/service/Data-Share/data-share.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  invoices:Invoice[];
  companies:Company[];
  username:string;
	ngOnInit(){
   
    this.dataShare.currentMessage.subscribe(data=>{this.username=data});
    this.dataService.getCompanies(this.username).subscribe(data=>{
      this.companies = data;
      console.log("allllll",this.companies); 
      this.InsertAllInvoices();

     });
  }
  
  InsertAllInvoices(){
    for(let company of this.companies){
    this.dataService.getAllInvoicesByCompany(company.id).subscribe(data=>{
      company.invoices = data;
      console.log("hna",data);
      console.log(company);
    });
    }
  }
	
  constructor(private dataService : UserDataService,
              private dataShare:DataShareService) {}
}
