import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';
import { Invoice } from '../../model/Invoice/invoice';
import {ErrosControlService} from '../service/erros-control.service';
import {ExcelService} from '../service/excel.service';
import { Company } from 'src/app/model/Company/company';
import { UserDataService } from 'src/app/service/user-data.service';
import { DataShareService } from 'src/app/service/Data-Share/data-share.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  settings = {
    columns: {
      num_order_fac: {
        title: 'N° d’ordre de la facture',
        type:'number'
      },
      num_fac: {
        title: 'N° de facture'
      },
      designation_bien: {
        title: 'Désignation du bien ou service'
      },
      ht: {
        title: 'HT'
      },
      tva: {
        title: 'TVA'
      },
      ttc: {
        title: 'TTC'
      },
      id_fiscal_fornisseur: {
        title: 'Identifiant fiscale du fournisseur'
      },
      raison_social_fornissuer: {
        title: 'Nom ou Raison sociale du fournisseur'
      },
      ice_fornisseur: {
        title: 'ICE du fournisseur'
      },
      taux_taxe: {
        title: 'Taux de la taxe'
      },
      mode_paiment: {
        title: 'mode paiement'
      },
      date_paiment: {
        title: 'Date paiement'
      },
      date_facture: {
        title: 'Date facture'
      },
      prorata: {
        title: 'Prorata %'
      },
    },
    attr: {
    class: 'table table-bordered'
    }
  };
  importContacts: Invoice[];
  dataControls: Invoice[];

  done:boolean=false ;
  haveErrorMissingValue: boolean=false;
  haveErrorLogicMontant: boolean = false;
  haveErrorLogicDate:boolean = false;
  haveErrorNumFac:boolean= false;
  formGroup1:FormGroup;
  formGroup2:FormGroup;
  formGroup3:FormGroup;
  formGroup4:FormGroup;
  companyName:string[];
  companies:Company[];
  typeDeclaration:string[];
  username:string;
  idUser:number;
  idCompany:number;
  nameCompany:string;
  //data for Xml FIle
  regime:number;
  periode:number;
  annee:number;
  constructor(private _formBuilder:FormBuilder,
            private errorsSrv : ErrosControlService,
            private excelSrv:ExcelService,
            private userData:UserDataService,
            private dataShare:DataShareService) { }

  ngOnInit(): void {
    this.dataShare.currentMessage.subscribe(data=>{this.username=data});
    this.userData.getCompanies(this.username).subscribe(data=>
      {this.companies=data;
      //  console.log("hnaaaaa",data); 
      });
    this.userData.getIdUser(this.username).subscribe(data=>this.idUser=data);
    this.companyName=["IBM","Microsoft","Inovo"];
    this.typeDeclaration=["Par Mois","Par Trimestre"];
    this.formGroup1 = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.formGroup2 = this._formBuilder.group({
      secondCtrl: ''
    });
  
  }
  selectChangeHandler (event: any) {
    //update the ui
    this.idCompany = event.target.value;
    console.log(this.idCompany);
  }


    onFileChange(evt: any){


     const target: DataTransfer = <DataTransfer>(evt.target);
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');
      
      this.done = true;
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {

        const bstr: string = e.target.result;
        const data = <any[]>this.excelSrv.importFromFile(bstr);
        const header: string[] = Object.getOwnPropertyNames(new Invoice());
        // console.log(data);
        const importedData = data.slice(1);
        this.dataControls=importedData;
        // console.log("DataControls not contacts----",this.dataControls);
        // console.log(importedData);
        // this.haveErrorMissingValue=this.errorsSrv.testMissingValue(importedData);
        // this.haveErrorLogicMontant=this.errorsSrv.testLogicMontant(importedData);
        this.errorsSrv.convertDate(importedData);
        this.importContacts = importedData.map(arr => {
          const obj = {};
          for (let i = 0; i < header.length; i++) {
            const k = header[i];
            obj[k] = arr[i];
          }
       

          return <Invoice>obj;
        })
        // if(this.excelSrv.testMissingValue(data))
        //   console.log('kayna');
        // else
        // console.log('makaynach');  
        
 
      };
      reader.readAsBinaryString(target.files[0]);
      //  this.affichage();
    }

  affichage(){
    console.log(" importData -----",this.importContacts);
  }

  controlError(){
    // this.affichage();
    this.haveErrorMissingValue=this.errorsSrv.testMissingValue(this.importContacts);
    console.log("Missing=>",this.haveErrorMissingValue);
    this.haveErrorLogicMontant=this.errorsSrv.testLogicMontant(this.importContacts);
    console.log("Montan=>",this.haveErrorLogicMontant);
    this.haveErrorLogicDate=this.errorsSrv.testLogicDate(this.importContacts);
    console.log("Date=>",this.haveErrorLogicDate);
    // console.log("hna------");
    // console.log(this.errorsSrv.
    this.haveErrorNumFac= this.errorsSrv.testLogicNumFacture(this.importContacts);
      // );
   
  }
  refreshErrorVariable(){
    this.haveErrorMissingValue=false;
    this.haveErrorLogicMontant=false;
    this.haveErrorLogicMontant=false;
    
  }
  finish(){
    // Treatment send to data bases
    //console.log(this.importContacts);
    this.userData.addAllInvoices(this.importContacts,this.idCompany).subscribe(data=>{
      console.log("insert lfilm",data);
    });
  
  let data:string="<?xml version='1.0' encoding='utf-8'?>"+"\r\n"+
  "<DeclarationReleveDeduction>\r\n"+
  "<annee>"+this.annee+"</annee>\r\n"+
  "<periode>"+this.periode+"</periode>\r\n"+
  "<regime>"+this.regime+"</regime>\r\n";
    
    for(let elem of this.importContacts)
    {
      data+="<rd> \r\n "+
      "<ord>"+elem.num_order_fac+"</ord>\r\n"+
      "<num>"+elem.num_fac+"</num>\r\n"+
      "<des>"+elem.designation_bien+"</des>\r\n"+
      "<mht>"+elem.ht+"</mht>\r\n"+
      "<tva>"+elem.tva+"</tva>\r\n"+
      " <ttc>"+elem.ttc+"</ttc>\r\n"+
      "<refF>\r\n"+        
        "<if>"+elem.id_fiscal_fornisseur+"</if>\r\n"+
        "<nom>"+elem.raison_social_fornissuer+" SOLUTIONS</nom>\r\n"+
        "<ice>"+elem.ice_fornisseur+"</ice>\r\n"+
      "</refF>\r\n"+
        "<tx>"+elem.taux_taxe+"</tx>\r\n"+
        "<prorata>"+elem.prorata+"</prorata> \r\n"+
        "<mp>\r\n"+
          "<id>"+elem.mode_paiment+"</id>\r\n"+
        "</mp>\r\n"+
        "<dpai>"+elem.date_paiment+"</dpai>\r\n"+
        "<dfac>"+elem.date_facture+"</dfac>\r\n"+
        "</rd>\r\n"
        ;
    }
    data+="</releveDeductions>\r\n"+
    "</DeclarationReleveDeduction>";
    console.log(data);
     // Convert the text to BLOB.
     const textToBLOB = new Blob([data], { type: 'text/plain' });
     const sFileName = 'formData.xml';	   // The file to save the data.

     let newLink = document.createElement("a");
     newLink.download = sFileName;

     if (window.webkitURL != null) {
         newLink.href = window.webkitURL.createObjectURL(textToBLOB);
     }
     else {
         newLink.href = window.URL.createObjectURL(textToBLOB);
         newLink.style.display = "none";
         document.body.appendChild(newLink);
     }

     newLink.click();
  }

  selectChangeTyper(event:any){
    const dat=new Date();
    if(event.target.value==0)
    {this.regime = 1;
     this.periode = dat.getMonth()+1;
    }

    if(event.target.value==1)
    {this.regime = 2; 
      if(dat.getMonth()>=1 && dat.getMonth()<4)
        this.periode=1;
      if(dat.getMonth()>=4 && dat.getMonth()<7)
        this.periode=2;
      if(dat.getMonth()>=7 && dat.getMonth()<10)
        this.periode=3;
      if(dat.getMonth()>=10 && dat.getMonth()<13)
        this.periode=4;  
    }
   this.annee = dat.getFullYear();
  }
 

}
