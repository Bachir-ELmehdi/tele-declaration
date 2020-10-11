export class Invoice {
        public  num_order_fac:number=0;
        public  num_fac :number=0;
        public  designation_bien:string="";
        public  ht:number=0;       
        public  tva:number=0; 
        public  ttc:number=0;
        public  id_fiscal_fornisseur:number=0;
        public  raison_social_fornissuer:string="";
        public  ice_fornisseur:string="";
        public  taux_taxe:number=0;
        public  mode_paiment:string="";
        public  date_paiment:Date= new Date();
        public  date_facture:Date= new Date();
        public  prorata:number=0;

  constructor(){}
}
