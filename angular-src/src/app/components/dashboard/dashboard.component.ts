import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessagingService} from '../../services/messaging.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  doughnutChartLabels:string[] = ['Quick', 'Bulk', 'Drip', 'WhatsApp'];
  doughnutChartData:number[] = [];

  datefrom:String="";
  dateto:String="";



 public doughnutChartType:string = 'doughnut';






  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Timeline'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [1560], label: 'Quick'},
    {data: [750], label: 'Bulk'},
    {data: [2], label: 'Drip'}
  ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  selfemail:String="";


  constructor(private auth:AuthService, private msgService:MessagingService) { }

  ngOnInit() {
    this.selfemail = this.auth.getSavedEmail();
    this.getallchilds();
  }

  childchange(ev){
    console.log(ev.target.value);
    this.geteverythingnew(ev.target.value);
  }

  quick:any;digital:any;bulk:any;drip:any;
  geteverythingnew(email){
    this.quick = 0;
    this.digital =0;
    this.bulk =0;
    this.drip = 0;
    this.doughnutChartData=[];

    this.msgService.getalltotalquickcount(email).subscribe(data=>{
        this.quick = data.count;
        this.msgService.getalltotalbulkcount(email).subscribe(data=>{
            this.bulk = data.count;
            this.msgService.getalltotaldripcount(email).subscribe(data=>{
                this.drip = data.count;
                this.msgService.getalltotaldigitalcount(email).subscribe(data=>{
                  this.digital = data.count;
                  this.doughnutChartData.push(this.quick,this.bulk,this.drip,this.digital);
                });
            });
        });
    });
  }




  digitalArr = [];
  geteverything(email){
    this.quickArr = [];
    this.bulkArr = [];
    this.dripArr = [];
    this.digitalArr = [];
    this.doughnutChartData = [];

    this.msgService.getallquickdashboard(email).subscribe(data=>{
      
        this.quickArr = data.data;
        this.msgService.getallbulkdashboard(email).subscribe(data=>{
          
            this.bulkArr = data.data;
            this.msgService.getalldripdashboard(email).subscribe(data=>{
              
                this.dripArr = data.data;


                this.msgService.getalldigitaldashboard(email).subscribe(data=>{
                  this.digitalArr = data.data;
                  this.doughnutChartData.push(this.quickArr.length,this.bulkArr.length,this.dripArr.length,this.digitalArr.length);
                });

                //console.log(this.dripArr.length);
                

                

                //this.doughnutChartLabels.push('Quick');
                //this.doughnutChartData.push(this.quickArr.length,this.bulkArr.length,this.dripArr.length);

                //this.doughnutChartData.push(1000,2000,2);
                //this.doughnutChartLabels.push('Bulk');
                //this.doughnutChartData.push(this.bulkArr.length);
                //this.doughnutChartLabels.push('Drip');
                //this.doughnutChartData.push(this.dripArr.length);

            });

        });

    });
  }













  childsArr:any[]=[];
  getallchilds(){
    this.auth.getChildAccess(this.auth.getSavedEmail()).subscribe(data=>{
      if(data.data.length>0){
        //console.log(data.data);
        
        this.childsArr = data.data;
        //console.log(this.ops);
        //console.log(this.childsArr);
        
        
      }else{
        console.log('No Childs');
      }
    });
  }

  quickArr:any[]=[];
  getallquick(){

    



    this.msgService.getallquick(this.auth.getSavedEmail()).subscribe(data=>{
      if(data.data.length>0){
        //console.log(data.data);
        
        this.quickArr = data.data;
        //console.log(this.ops);
        
      }else{
        console.log('No Quick Messages');
      }
    });
  }    

  bulkArr:any[]=[];
  getallbulk(){
    this.msgService.getallbulk(this.auth.getSavedEmail()).subscribe(data=>{
      if(data.data.length>0){
        // console.log(data.data);
        
        
        this.bulkArr = data.data;
        //console.log(this.ops);
        

      }else{
        console.log('No Bulk Messages');
      }
    });
  }    

  dripArr:any[]=[]
  getalldrip(){
    this.msgService.getalldrip(this.auth.getSavedEmail()).subscribe(data=>{
      if(data.data.length>0){
        
        
        this.dripArr = data.data;
        //console.log(this.ops);
        // console.log(this.dripArr.length);
        
      }else{
        console.log('No Bulk Messages');
      }
    });
  }    



}
