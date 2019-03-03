import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-messagingdashboard',
  templateUrl: './messagingdashboard.component.html',
  styleUrls: ['./messagingdashboard.component.css']
})
export class MessagingdashboardComponent implements OnInit {
    // Doughnut
    // public doughnutChartLabels:string[] = [];
    // public doughnutChartData:number[] = [];
     public doughnutChartType:string = 'doughnut';
   
  doughnutChartLabels:string[] = ['Quick', 'Bulk', 'Drip','WhatsApp'];
  doughnutChartData:number[] = [];

  constructor(private auth:AuthService, private msgService:MessagingService) { }

  quickArr:any[]=[];
  digitalArr:any[]=[];
  bulkArr:any[]=[];
  dripArr:any[]=[];

  quick:any;digital:any;bulk:any;drip:any;

  ngOnInit() {
     this.geteverythingnew(this.auth.getSavedEmail());
  }

  geteverythingnew(email){

    this.quick = 0;
    this.digital =0;
    this.bulk =0;
    this.drip = 0;

    this.quickArr = [];
    this.bulkArr = [];
    this.dripArr = [];
    this.digitalArr = [];
    this.doughnutChartData = [];

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

  // geteverything(){
  //   this.msgService.getallquick(this.auth.getSavedEmail()).subscribe(data=>{
  //     if(data.data.length>0){
  //       this.quickArr = data.data;
  //       this.msgService.getallbulk(this.auth.getSavedEmail()).subscribe(data=>{
  //         if(data.data.length>0){
  //           this.bulkArr = data.data;
  //           this.msgService.getalldrip(this.auth.getSavedEmail()).subscribe(data=>{
  //             if(data.data.length>0){
  //               this.dripArr = data.data;

  //               this.quickArr.length;

  //               this.doughnutChartLabels.push('Quick');
  //               this.doughnutChartData.push(this.quickArr.length);
  //               this.doughnutChartLabels.push('Bulk');
  //               this.doughnutChartData.push(this.bulkArr.length);
  //               this.doughnutChartLabels.push('Drip');
  //               this.doughnutChartData.push(this.dripArr.length);
  //             }else{
  //               console.log('No Bulk Messages');
  //             }
  //           });
  //         }else{
  //           console.log('No Bulk Messages');
  //         }
  //       });

  //     }else{
  //       console.log('No Quick Messages');
  //     }
  //   });
  // }




  // getallquick(){
  //   this.msgService.getallquick(this.auth.getSavedEmail()).subscribe(data=>{
  //     if(data.data.length>0){
  //       //console.log(data.data);
        
  //       this.quickArr = data.data;
  //       this.doughnutChartLabels.push('Quick');
  //       this.doughnutChartData.push(this.quickArr.length);
  //     }else{
  //       console.log('No Quick Messages');
  //     }
  //   });
  // }    

  // removequick(name){
  //   this.msgService.removequick(name).subscribe(data=>{
  //       if(data.success){
  //         alert("Removed");
  //         this.getallquick();
  //       }else{
  //         alert("Not Removed");
  //       }
  //   });
  // }

  
  // getallbulk(){
  //   this.msgService.getallbulk(this.auth.getSavedEmail()).subscribe(data=>{
  //     if(data.data.length>0){
  //       // console.log(data.data);
        
        
  //       this.bulkArr = data.data;
  //       this.doughnutChartLabels.push('Bulk');
  //       this.doughnutChartData.push(this.bulkArr.length);
  //     }else{
  //       console.log('No Bulk Messages');
  //     }
  //   });
  // }    

  // removebulk(name){
  //   this.msgService.removebulk(name).subscribe(data=>{
  //       if(data.success){
  //         alert("Removed");
  //         this.getallbulk();
  //       }else{
  //         alert("Not Removed");
  //       }
  //   });
  // }

 
  // getalldrip(){
  //   this.msgService.getalldrip(this.auth.getSavedEmail()).subscribe(data=>{
  //     if(data.data.length>0){
        
        
  //       this.dripArr = data.data;
  //       // console.log(this.dripArr.length);
  //       this.doughnutChartLabels.push('Drip');
  //       this.doughnutChartData.push(this.dripArr.length);
  //     }else{
  //       console.log('No Bulk Messages');
  //     }
  //   });
  // }    

  // removedrip(name){
  //   //console.log(name);
    
  //   this.msgService.removedrip(name).subscribe(data=>{
  //       if(data.success){
  //         alert("Removed");
  //         this.getalldrip();
  //       }else{
  //         alert("Not Removed");
  //       }
  //   });
  // }

}
