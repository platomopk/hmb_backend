import { Component, OnInit, ViewChild, SimpleChange } from "@angular/core";
import { MessagingService } from "../../services/messaging.service";
import { AuthService } from "../../services/auth.service";
import { BaseChartDirective } from "../../../../node_modules/ng2-charts";
import * as CryptoJS from 'crypto';
import {AES, enc} from 'crypto-js'



@Component({
  selector: "app-prioutbox",
  templateUrl: "./prioutbox.component.html",
  styleUrls: ["./prioutbox.component.css"]
})

export class PrioutboxComponent implements OnInit {
  @ViewChild("baseChart") chart:BaseChartDirective;

  mainArray: any = [];
  quickarr: any = [];
  bulkarr: any = [];
  digitalarr: any = [];
  intervalid: any;

  _date:Date=new Date();

  spinner: boolean = true;

  localemail:String='';

  sent: boolean = false;

  reloadChart() {
    if (this.chart && this.chart.chart && this.chart.chart.config) {
       //this.chart.chart.destroy();
       
      //  this.chart.options = this.options;
      //  this.chart.chart = 0;

       
      //  this.chart.datasets = this.lineChartData;
      //  this.chart.labels = this.lineChartLabels;
       

      //this.chart.chart.update();

       //this.chart.chart.config.data.labels = this.lineChartLabels;
       //this.chart.chart.config.data.datasets = this.lineChartData;
       
       this.chart.chart.update();


       //this.chart.ngOnInit();
  }
}

  public lineChartData: Array<any> = [
    {data:[0], label:'Jazz'},
    {data:[0], label:'Zong'},
    {data:[0], label:'Warid'},
    {data:[0], label:'Ufone'},
    {data:[0], label:'Telenor'}
  ];
  // public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: true
  };
  // public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April'];
  public lineChartLabels: Array<any> = [new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second:'numeric', hour12: true })];
  public lineChartColors: Array<any> = [
    {
      // red
      backgroundColor: "rgba(210,48,48,0.00)",
      borderColor: "rgba(255,0,0,0.8)",
      pointBackgroundColor: "rgba(210,48,48,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(210,48,48,0.05)"
    },
    {
      // green
      backgroundColor: "rgba(77,83,96,0.00)",
      borderColor: "rgba(41,242,41,0.8)",
      pointBackgroundColor: "rgba(41,242,41,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(41,242,41,0.05)"
    },
    {
      // navy
      backgroundColor: "rgba(148,159,177,0.00)",
      borderColor: "rgba(0,0,128,1)",
      pointBackgroundColor: "rgba(0,0,128,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(0,0,128,0.8)"
    },
    {
      // orange
      backgroundColor: "rgba(148,159,177,0.00)",
      borderColor: "rgba(255,165,0,1)",
      pointBackgroundColor: "rgba(255,165,0,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255,165,0,0.8)"
    },
    {
      // orange
      backgroundColor: "rgba(148,159,177,0.00)",
      borderColor: "rgba(46,197,255,1)",
      pointBackgroundColor: "rgba(46,197,255,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(46,197,255,0.8)"
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = "line";

  public options:any={
    animation:{
      duration:0,
      easing:'linear'
    }
    // elements: {
    //   line: {
    //       tension: 0, // disables bezier curves
    //   }
    // }   
  }

  constructor(
    private messagingService: MessagingService,
    private authService: AuthService
  ) {}


  deliverinterval:any;

  ngAfterViewInit(){
    this.localemail = this.authService.getSavedEmail();
    //console.log(AES.decrypt('U2FsdGVkX1+22scdPaZqa42X/QEVMK0ChS+9qemeqrdtpo0BRnzMH7+6nRXPsCqCdI3DXOgGf1tpUxWJNNJwRQ==', 'a@a.com').toString(enc.Utf8));
     //console.log(this.lineChartData, this.lineChartLabels);
    
    //this.lineChartLabels.push(Date.now());



    this.getoutbox();
    this.gettotaloutbox();
    this.intervalid = setInterval(() => {
      this.getoutbox();
      this.gettotaloutbox();
      
    }, 1000 * 5);
  }

  ngOnInit() {
    

    // this.lineChartData = [
    //   {data:[0], label:'Quick'},
    //   {data:[0], label:'Bulk'},
    //   {data:[0], label:'Digital'}
    // ];

    // console.log(this.lineChartData, this.lineChartLabels);
    
    // this.lineChartLabels.push(Date.now());

    // this.getoutbox();
    // this.gettotaloutbox();
    // this.intervalid = setInterval(() => {
    //   this.getoutbox();
    //   this.gettotaloutbox();
    // }, 1000 * 5);
  }

  ngOnDestroy() {
    clearInterval(this.intervalid);
  }

  getemail() {
    alert(this.authService.getSavedEmail());
  }

  getoutbox() {
    this.sent = false;
    this.spinner = true;
    this.messagingService
      .getallprioutboxquicklimit(this.authService.getSavedEmail())
      .subscribe(data => {
        if (data.success) {          
          this.quickarr = [];
          data.data.forEach(element => {
            if(this.localemail != ''){
              element.msg = element.encrypted == true? AES.decrypt(element.msg, this.localemail.toString()).toString(enc.Utf8):element.msg
            }
          });
          this.quickarr = data.data;
          this.spinner =false;
          // console.log(this.quickarr);
        }
      });
  }

  outboxquick: number = 0;
  outboxbulk: number = 0;
  outboxdigital: number = 0;
  q:any[]=[];
  b:any[]=[];
  d:any[]=[];
  l:any[]=[];


    // lineChart
  // public lineChartData:Array<any> = [
  //   {data: [85,60,85,12], label: 'Quick'},
  //   {data: [90,80,85,88], label: 'Bulk'},
  //   {data: [18,23,1,7], label: 'WhatsApp'}
  // ];
  gettotaloutbox() {
    
    if(this.lineChartLabels.length == 10){
      this.lineChartData[0].data.splice(0,1);
      this.lineChartData[1].data.splice(0,1);
      this.lineChartData[2].data.splice(0,1);
      this.lineChartData[3].data.splice(0,1);
      this.lineChartData[4].data.splice(0,1);
      this.lineChartLabels.splice(0,1)
    }

    this.messagingService
      .getallprioutboxquickjazzcount(this.authService.getSavedEmail())
      .subscribe(data1 => {
        if (data1.success) {
          this.outboxquick = data1.count;
          this.q.push(data1.count);

          // console.log('jazz',data1.count);

          this.messagingService.getallprioutboxbulkjazzcount(this.authService.getSavedEmail())
          .subscribe(data2 => {

            this.lineChartData[0].data[this.lineChartData[0].data.length] = data1.count + data2.count;

          });
          
        }

        this.messagingService
          .getallprioutboxquickzongcount(this.authService.getSavedEmail())
          .subscribe(data => {
            if (data.success) {
              this.outboxbulk = data.count;
              this.b.push(data.count);

              // console.log('zong',data.count);
              this.messagingService.getallprioutboxbulkzongcount(this.authService.getSavedEmail())
              .subscribe(data2 => {
    
                this.lineChartData[1].data[this.lineChartData[1].data.length] = data.count + data2.count;
    
              });

              
            }

            this.messagingService
              .getallprioutboxquickwaridcount(this.authService.getSavedEmail())
              .subscribe(data => {
                if (data.success) {
                  this.outboxdigital = data.count;
                  this.d.push(data.count);

                  // console.log('warid',data.count);
                  this.messagingService.getallprioutboxbulkwaridcount(this.authService.getSavedEmail())
                  .subscribe(data2 => {
        
                    this.lineChartData[2].data[this.lineChartData[2].data.length] = data.count + data2.count;
        
                  });

                  


                  this.messagingService.getallprioutboxquickufonecount(this.authService.getSavedEmail())
                  .subscribe(data=>{
                    // console.log('ufone',data1.count);

                    this.messagingService.getallprioutboxbulkufonecount(this.authService.getSavedEmail())
                    .subscribe(data2 => {
          
                      this.lineChartData[3].data[this.lineChartData[3].data.length] = data.count + data2.count;
          
                    });





                    this.messagingService.getallprioutboxquicktelenorcount(this.authService.getSavedEmail())
                    .subscribe(data=>{
                      // console.log('tp',data1.count);
                      this.messagingService.getallprioutboxbulktelenorcount(this.authService.getSavedEmail())
                      .subscribe(data2 => {
            
                        this.lineChartData[4].data[this.lineChartData[4].data.length] = data.count + data2.count;
            

                        this.lineChartLabels[this.lineChartLabels.length] = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second:'numeric', hour12: true });                       
                        this.reloadChart();
                      });
  
                        
  
                    });

                  });

                  //this.lineChartLabels[this.lineChartLabels.length] = Date.now();

                  //this.l.push(Date.now());

                  //this.reloadChart();
                }
              });
          });
      });
  }





}
