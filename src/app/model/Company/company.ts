import { Invoice } from "../Invoice/invoice";

export class Company {
    constructor(
        public id:number=0,
        public companyName:string="",
        public companyAdress:string="",
        public id_ice:string="",
	    public id_if :String="",
        public id_rc :String="",
        public invoices:Invoice[]
            
    ){}
}
