import { Component, AfterViewInit, OnInit } from '@angular/core';
import { UserDataService } from '../service/user-data.service';
import { Invoice } from '../model/Invoice/invoice';
import { DataShareService } from '../service/Data-Share/data-share.service';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../model/Company/company';
import { MultiDataSet, Label ,SingleDataSet, Color} from 'ng2-charts';
import { delay } from 'rxjs/operators';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';



declare var require: any;

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit, AfterViewInit{
  username:string=""; 
  subtitle: string;
  userId:number=0;
  numberInvoice:number=0;
  numberCompany:number=0;
  numberUser:number=0;
  nombreUser:number=0;
  numberAmount:number=0;
  invoices:Invoice[];
  companies:Company[];
	ngOnInit(){
   
  console.log("session",sessionStorage.getItem('autenticater'));
    //Prepare Sharinng variable "Username"
    this.dataShare.changeMessage(sessionStorage.getItem('autenticater'));
    this.dataShare.currentMessage.subscribe(data=>{this.username = data});
    // this.username = this.route.snapshot.params['username'];
    // this.dataShare.changeMessage(this.username);
    //End Username
    //get Id User By UserName
    //this.dataService.getIdUser(this.username).subscribe(data=> this.userId = data);
    // //get ALL Companies of User
    this.dataService.getCompanies(this.username).subscribe(data=>{
       this.companies = data;
      //  console.log("allllll",this.companies); 
       this.InsertAllInvoices();
      this.numberCompany = this.companies.length;
      this.calculNumberInvoiceOffAllCompanies();
      this.calculNumberUserOffAllCompanies();
      this.calculOfAmountDeclared(); 
      this.parametrePieChart(); 
      this.parametreBarChart();
      });
      
      // this.parametrePieChart(this.pieChartLabels1);
     
    }
  refreshData(idCompany:number){
   
    this.dataService.getAllUsersByCompany(idCompany).subscribe(data=>{
      this.numberUser +=data.length;
      });
   }
  InsertAllInvoices(){
    // for(let company of this.companies){
    // this.dataService.getAllInvoicesByCompany(company.id).subscribe(data=>{
    //   company.invoices = data;
    //   // console.log(data);
    //   // console.log(company);
    // });
    // }
  }
  calculNumberInvoiceOffAllCompanies(){
    
    for(let compnay of this.companies)
    {
      this.numberInvoice+=compnay.invoices.length;
    }
  }
  calculOfAmountDeclared(){
    for(let company of this.companies){
      for(let i=0; i<company.invoices.length; i++)
      this.numberAmount += company.invoices[i].ttc; 
    }
  }
  calculNumberUserOffAllCompanies(){
    
    for(let compnay of this.companies)
    {
      this.refreshData(compnay.id);
    }
  }
	
  constructor(private route: ActivatedRoute,
              private dataService : UserDataService,
              private dataShare:DataShareService) {
    this.subtitle = 'This is some text within a card block.';
    // console.log(this.companies);
  }


   // lineChart
   public lineChartData: Array<any> = [
    { data: [24.5, 28.3, 42.7, 32, 34.9, 48.6, 40], label: 'Iphone'},
    { data: [8.9, 5.8, 21.9, 5.8, 16.5, 6.5, 14.5], label: 'Ipad' }
  ];
  public lineChartLabels: Array<any> = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
  ];
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: 'transparent',
      borderColor: '#137eff',
      pointBackgroundColor: '#137eff',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#137eff'
    },
    {
      // dark grey
      backgroundColor: 'transparent',
      borderColor: '#ced4da',
      pointBackgroundColor: '#ced4da',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#ced4da'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';

  // bar chart
    public barChartData: Array<any> = [
        { data: [1.1, 1.4, 1.1, 0.9, 2.1, 1, 0.3, 0.5, 1.2, 1.0, 0.4, 0.9], label: 'Cost' }
    ];
    public barChartLabels: Array<any> = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12'
    ];
//data  of Doughnut Chart
   
    public barChartOptions: any = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        },
        scales: {
            xAxes: [{
                display: false,
                barPercentage: 0.4,
                categoryPercentage: 0.5
            }],
            yAxes: [{
                display: false
            }]
        }
    };
    public barChartColors: Array<any> = [
        {
            backgroundColor: '#2962ff',
            hoverBackgroundColor: '#2962ff',
            hoverBorderWidth: 2,
            hoverBorderColor: '#2962ff'
        }
    ];

    //color of bar Invoice
    public barChartColors1: Array<any> = [
      {
          backgroundColor: 'rgb(184, 167, 192)',
          hoverBackgroundColor: '#2962ff',
          hoverBorderWidth: 2,
          hoverBorderColor: '#2962ff'
      }
  ];
    //End color of bar Invoice 


    //color of bar company
    public barChartColors2: Array<any> = [
      {
          backgroundColor: 'white',
          hoverBackgroundColor: '#2962ff',
          hoverBorderWidth: 2,
          hoverBorderColor: '#2962ff'
      }
  ];
    //End color of bar company
    public barChartLegend = false;
    public barChartType = 'bar';
  ngAfterViewInit() {}




  // Pie Chart

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  //////----------------////////////////////////////////////////////////////////////
//Pie Chart

  public polarAreaChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData: SingleDataSet = [300, 500, 100, 40, 120];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';


  public pieChartOptions1: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels1: Label[] = [];
  public pieChartData1: number[] = [];
  public pieChartType1: ChartType = 'pie';
  public pieChartLegend1 = true;
  public pieChartColors1 = [
    
    {
      backgroundColor: [],
    },
  ];
  parametrePieChart(){
   let i=0;
   for (let company of this.companies){
    this.pieChartLabels1[i] = company.companyName;
    this.pieChartColors1[0].backgroundColor[i] = this.getRandomColor();
    this.pieChartData1[i]=0;
     for(let invoice of company.invoices)
     {
     this.pieChartData1[i]+=invoice.ttc;}
    i++;
   }
   
    //  this.pieChartLabels1=[ ['In', 'Store', 'Sales'], 'Mail Sales','kkkkk']; 
    //    this.pieChartLabels1[2]='llll';

  }

  ////////--------------------------------------------------------------------
  //Line Chart---///

  public lineChartData1: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  ];
  public lineChartLabels1: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions1: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors1: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend1 = true;
  public lineChartType1 = 'line';
//----function generate Color -----//
getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//bar chart Of invoices------------//////////
public barChartOptionsI: ChartOptions = {
  responsive: true,
  // We use these empty structures as placeholders for dynamic theming.
  scales: { xAxes: [{}], yAxes: [{}] },
  plugins: {
    datalabels: {
      anchor: 'end',
      align: 'end',
    }
  }
};
public barChartLabelsI: Label[] = ['1', '2', '3', '4'];
public barChartTypeI: ChartType = 'bar';
public barChartLegendI = true;

public barChartDataI: ChartDataSets[] = [
   { data: [28, 48, 40, 19], label: 'Series B' },
  // { data: [28, 48, 40, 19], label: 'Series B' },

  // { data: [28, 48, 40, 19], label: 'Series B' },
];


//  { data: [28, 48, 40, 19], label: 'Series B' },


parametreBarChart(){
  var i=0;
  var j=0;
  let tab:number[]=[];
  // console.log(this.barChartDataI[0]);
  for (let company of this.companies){
     j=0; 
     tab=[];
    for(let k=company.invoices.length; k>0 && j<4; k--)
     { 
     tab[j] = company.invoices[k-1].ttc;
     j++;
     }
     this.barChartDataI[i].data =tab;
     this.barChartDataI[i].label = company.companyName;
     this.barChartDataI[i].backgroundColor= this.getRandomColor();
    if(i<2)
     this.barChartDataI.push({ data: [], label: '' });

    //  console.log("tab ",tab);
    //  console.log("data---",this.barChartDataI[i]);
     i++;
  }   
  // console.log(this.barChartDataI[1].data);
    // this.barChartDataI[0]=({ data: [28, 48, 40, 19], label: 'Series B' });

  //  console.log(this.barChartDataI[0]);
}


//------- ENd Bar chart ----------------------////
}



