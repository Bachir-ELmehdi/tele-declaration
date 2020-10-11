import { Company } from "../Company/company";

export class User {
    constructor(
    public id:number=0,
    public username:string="",
    public email:string="",
    public password:string="",
    public status:number=0,
    public companies:Company[]=[]
    ){}
    

}
