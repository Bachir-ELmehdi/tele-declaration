import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { User } from '../model/User/user';
import { Invoice } from '../model/Invoice/invoice';
import { Company } from '../model/Company/company';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  host= "facturedeclaration-env.eba-36k9ev2x.us-east-2.elasticbeanstalk.com";
  constructor(private httpClient:HttpClient) { }

  saveUser(user:User){
     return this.httpClient.post<User>(`http://${this.host}/users`,user);
  }

  testLoginUser(username:string,password:string){
    
    let basicAuthHeaderstring = this.createAuthenticationHttpHeader();
    let header = new HttpHeaders({
      Authorization : basicAuthHeaderstring
    })
    return this.httpClient.get<number>(`http://${this.host}/testLogin/${username}/${password}`
    ,{headers:header});

  }
  createAuthenticationHttpHeader(){
    let user= "teledeclaration";
    let password= "teledeclaration.pro";
    let basicAuthHeaderstring = 'Basic ' + window.btoa(user + ':' + password);
    return basicAuthHeaderstring;
  }

  // Data Of Invoices
  getAllInvoicesByCompany(id){
    
    let basicAuthHeaderstring = this.createAuthenticationHttpHeader();
    let header = new HttpHeaders({
      Authorization : basicAuthHeaderstring
    })
    return this.httpClient.get<Invoice[]>(`http://${this.host}/getInvoiceByCompany/${id}`,{headers:header});
  }

    //get Id User By UserName
    public getIdUser(username:string){

    let basicAuthHeaderstring = this.createAuthenticationHttpHeader();
    let header = new HttpHeaders({
      Authorization : basicAuthHeaderstring
    })
    return this.httpClient.get<number>(`http://${this.host}/getId/${username}`,{headers:header});
  }

   //get All Companies Of User
   public getCompanies(username:string){

    let basicAuthHeaderstring = this.createAuthenticationHttpHeader();
    let header = new HttpHeaders({
      Authorization : basicAuthHeaderstring
    })
    return this.httpClient.get<Company[]>(`http://${this.host}/getCompaniesOfUser/${username}`,{headers:header});
  }

  //Find CompanyByID
  public findCompanyById(id:number){
    let basicAuthHeaderstring = this.createAuthenticationHttpHeader();
    let header = new HttpHeaders({
      Authorization : basicAuthHeaderstring
    })
    return this.httpClient.get<Company>(`http://${this.host}/companies/${id}`,{headers:header});
  }


  //Add New Company  Of User
  public addCompany(idUser:number,company:Company){
    let basicAuthHeaderstring = this.createAuthenticationHttpHeader();
    let header = new HttpHeaders({
      Authorization : basicAuthHeaderstring
    })
    return this.httpClient.put<Company>(`http://${this.host}/users/newCompany/${idUser}`,company,{headers:header});
    }
    //Remove Company Of User 
    public removeCompany(idUser:number,idCompany:number){
      let basicAuthHeaderstring = this.createAuthenticationHttpHeader();
      let header = new HttpHeaders({
        Authorization : basicAuthHeaderstring
      })
      return this.httpClient.put<Company>(`http://${this.host}/users/removeCompany/${idUser}/${idCompany}`,{headers:header});
      }
    //Update Company
    public updateCompany(id,company:Company){
      let basicAuthHeaderstring = this.createAuthenticationHttpHeader();
      let header = new HttpHeaders({
        Authorization : basicAuthHeaderstring
      })
      return this.httpClient.put<Company>(`http://${this.host}/updateCompany/${id}`,company,{headers:header});
    }

    // treatment Manage Users ********************************//
    
    //Methode 1: Add User With Your unique Company
    public addUserWithCompany(user:User,idCompany:number){     
      let basicAuthHeaderstring = this.createAuthenticationHttpHeader();
      let header = new HttpHeaders({
        Authorization : basicAuthHeaderstring
      })
       return this.httpClient.post<User>(`http://${this.host}/addUserWithCompany/${idCompany}`,user,{headers:header});
    }
//Methode 2: Find All Users By One Company
    public getAllUsersByCompany(idCompany:number){
      let basicAuthHeaderstring = this.createAuthenticationHttpHeader();
      let header = new HttpHeaders({
        Authorization : basicAuthHeaderstring
      })
      return this.httpClient.get<User[]>(`http://${this.host}/getUsersByCompany/${idCompany}`,{headers:header});
    }
//Methode 3:Find user BY Your Id
    public getUserById(idUser:number){
      let basicAuthHeaderstring = this.createAuthenticationHttpHeader();
      let header = new HttpHeaders({
        Authorization : basicAuthHeaderstring
      })
      return this.httpClient.get<User>(`http://${this.host}/users/${idUser}`,{headers:header});
    }
//Methode 4:Update Sample User
    public updateSimpleUser(user:User,idUser:number,idCompany:number){
      let basicAuthHeaderstring = this.createAuthenticationHttpHeader();
      let header = new HttpHeaders({
        Authorization : basicAuthHeaderstring
      })
      return this.httpClient.put<User>(`http://${this.host}/users/${idUser}/${idCompany}`,user,{headers:header});
    }
//Methode 5: Delete Sample User
    public deletSimpleUser(idUser:number,idCompany:number){
      let basicAuthHeaderstring = this.createAuthenticationHttpHeader();
      let header = new HttpHeaders({
        Authorization : basicAuthHeaderstring
      })
      return this.httpClient.delete<User>(`http://${this.host}/users/deletSimpleUser/${idUser}/${idCompany}`,{headers:header});
    }
    //** End treatment Manage Users *****************************/
    
   //**  treatment Of Invoices *****************************/
//Methode 1:Insert All Invoices By id Company
public addAllInvoices(invoices:Invoice[],idCompany:number){
  let basicAuthHeaderstring = this.createAuthenticationHttpHeader();
  let header = new HttpHeaders({
    Authorization : basicAuthHeaderstring
  });
  console.log("from service ",invoices);
   return this.httpClient.put<Invoice[]>(`http://${this.host}/users/invoices/${idCompany}`,invoices,{headers:header});
}

public sendEmail(user:User){
  let basicAuthHeaderstring = this.createAuthenticationHttpHeader();
  let header = new HttpHeaders({
    Authorization : basicAuthHeaderstring
  })
  return this.httpClient.post<User>(`http://${this.host}/testapp/getUser`,user,{headers:header});
  
}


}

