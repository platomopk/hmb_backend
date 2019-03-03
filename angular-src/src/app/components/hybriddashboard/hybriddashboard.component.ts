import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HybridService } from '../../services/hybrid.service';

@Component({
  selector: 'app-hybriddashboard',
  templateUrl: './hybriddashboard.component.html',
  styleUrls: ['./hybriddashboard.component.css']
})
export class HybriddashboardComponent implements OnInit {
    // Doughnut
  // public doughnutChartLabels:string[] = ['Msgs Sent', 'Noti. Sent', 'Delivered', 'Outbox','Seen', 'Reported'];
  // public doughnutChartData:number[] = [350, 450, 100,100,20,200];
  // public doughnutChartType:string = 'doughnut';
  
  constructor(private authService:AuthService, private hybridService:HybridService) { }

  ngOnInit() {
    this.getallhybrid();
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }

  hybridArr:any[]=[];
  getallhybrid(){
    this.hybridService.getallhybrid(this.authService.getSavedEmail()).subscribe(data=>{
      if(data.success){
        this.hybridArr = data.data;

      }
    });
  }

  removehybrid(name){
    this.hybridService.removehybrid(name).subscribe(data=>{
      if(data.success){
        alert("Deleted");
        this.getallhybrid();
      }else{
        alert("Not deleted.");
      }
    });
  }



}
