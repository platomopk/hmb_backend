import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboardnotification',
  templateUrl: './dashboardnotification.component.html',
  styleUrls: ['./dashboardnotification.component.css']
})
export class DashboardnotificationComponent implements OnInit {
    // Doughnut
    // public doughnutChartLabels:string[] = ['Sent', 'Seen','Reported'];
    // public doughnutChartData:number[] = [350, 450,100];

     doughnutChartLabels:string[] = ['Sent', 'Seen', 'Ack' ,'Reported'];
     doughnutChartData:number[] = [];
    public doughnutChartType:string = 'doughnut';
   
  notificationsArr:any[]=[];
  tempArr:any[]=[];
  payloadArr:any[]=[];

  sent:number=0;
  mastersent:number=0;
  seen:number=0;
  masterseen:number=0;
  ack:number=0;
  masterack:number=0;
  reported:number=0;
  masterreported:number=0;


  constructor(private authService:AuthService, private notificationService:NotificationService,private router:Router) { }



  ngOnInit() {
    this.getallnotifications();
  }


  getallnotifications(){
    this.notificationService.getallnotificaitons(this.authService.getSavedEmail())
    .subscribe(data=>{
      // console.log(data);
      
      if(data.success){

        this.tempArr= data.data;
        this.tempArr.forEach(element => {

          this.payloadArr = element.payload;
          this.payloadArr.forEach(element => {
            this.sent++;
            this.mastersent++;

            if (element.ack != "0") {
              this.ack++;
              this.masterack++;
            }
            if (element.seen != "0") {
              this.seen++;
              this.masterseen++;
            }
            if (element.reported != "0") {
              this.reported++;
              this.masterreported++;
            }
          });

          var ob = {
            name:element.name,
            created:element.created,
            category:element.category,
            message:element.message,
            sent:this.sent,
            seen:this.seen,
            ack:this.ack,
            reported:this.reported,
            notificationid:element._id
          }
          
          this.notificationsArr.push(ob);
          this.sent = 0;
          this.seen = 0;
          this.ack = 0;
          this.reported = 0;
        });


        // console.log(this.sent,this.seen,this.ack,this.reported);
        // console.log(this.payloadArr);

        this.doughnutChartData.push(this.mastersent);
        this.doughnutChartData.push(this.masterseen);
        this.doughnutChartData.push(this.masterack);
        this.doughnutChartData.push(this.masterreported);
       
        
      }else{
        console.log("No notifications found.");
      }
    });
  }


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }

  reportedclick(id){
    this.router.navigate(['/notification/reported'], { queryParams: { notificationid: id } });
  }
  
}
