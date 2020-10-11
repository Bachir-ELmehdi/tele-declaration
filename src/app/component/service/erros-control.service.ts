import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ErrosControlService {

  

  public testMissingValue(data):boolean{
    // console.log("from test Missing",data);
    let test:boolean=false;
    for(let row of data){
        
        for(let j=0; j<14; j++)
          if(row.tva == undefined || row.ht == undefined||row.ttc == undefined||row.num_order_fac == undefined
            ||row.id_fiscal_fornisseur == undefined || row.num_fac == undefined||row.designation_bien == undefined||row.raison_social_fornissuer == undefined
            ||row.ice_fornisseur == undefined || row.taux_taxe == undefined||row.mode_paiment == undefined||row.date_paiment == undefined
            ||row.date_facture == undefined||row.prorata == undefined
            )
            test = true;
        }
    
     return test;
     
  }
  public testLogicMontant(data):boolean{
    for(let row of data){
      if(row.ttc < row.tva || row.ht > row.ttc || row.ht < row.tva)
        return true;
    }
    return false;

  }
  //Control Error Num factue
  public testLogicNumFacture(data){
   let tab:number[]=[];
   let i=0;
   let test:boolean=false;

    for(let row of data)
    {
       tab[i]=row.num_fac;
       i++;
      console.log("lllllllll",row.num_fac);
    }
    console.log("ha tab ùùùù",tab);
    i=0;
    for(let j=i+1; j<tab.length;j++)
    {
     if(tab[i]==tab[j]) 
       return true;
     else if(j==tab.length-1)
       i++;  
    }
    console.log("ha tab",tab);
    return false;
  }
  ExcelDateToJSDate(serial:number) {
  
    return formatDate(new Date(Math.round((serial - 25569)*86400*1000)), 'yyyy-MM-dd','en');

 }
 
 convertDate(data){
  let test;
   for(let row of data){
     row[11] = this.ExcelDateToJSDate(row[11]);
     row[12] = this.ExcelDateToJSDate(row[12]);
     if(row[11]<row[12])
       test=true; 
   }

    
 }
 testLogicDate(data){
  let test:boolean=false;
  for(let row of data){
    if(row.date_paiment<row.date_facture)
       test=true; 
 }
 return test;

 }
 testnumFacture(data){
  let test:boolean=false;
  // for(let row of data){
    
  //   }
  }
 


 constructor() { }
}
