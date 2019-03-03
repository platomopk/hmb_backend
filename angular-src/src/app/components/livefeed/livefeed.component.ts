import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-livefeed',
  templateUrl: './livefeed.component.html',
  styleUrls: ['./livefeed.component.css']
})
export class LivefeedComponent implements OnInit {

  constructor(public schoolService:SchoolService, private authService:AuthService) { }
  schoolname:String="";
  snippet:String="";
  driversarr:any[] = [];
  driverid:String="";
  lat: number = 0;
  lng: number = 0;
  url:String="/assets/imgs/bus.png";
  interval : any;

  check : Boolean = false;

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this.schoolname = user.name;
    this.getalldrivers();


    this.interval = setInterval(() => {
      this.trackdriver();
      console.log("Interval");
      
    }, 1000 * 10);
    
  }

  getalldrivers(){
      this.schoolService.getverifieddrivers({schoolname:this.schoolname}).subscribe(data=>{
        if(data.success){
          this.driversarr = data.data;
        }else{
          alert(data.error)
        }
      })
  }

  ngOnDestroy(){
    clearInterval(this.interval);
  }

  trackdriver(){
    if(this.driverid == ""){
      console.log("No driver id provided");
      
      // clearInterval(this.interval);
    }else{
      this.schoolService.trackdrivers({driverid:this.driverid}).subscribe(data=>{
        if(data.success){
          var loc = data.location;
          var dloc = loc.split(",");

          this.lat = Number(0.0);
          this.lng = Number(0.0);
          this.snippet = "";

            this.lat = Number(dloc[0]);
            this.lng = Number(dloc[1]);
            data.data.forEach(element => {
              this.snippet += "<div><img width=40px height=40px src='"+element.picture+"' >&nbsp;&nbsp;&nbsp;<b><span>"+element.fullname+"</b> from <b>"+element.schoolname+"</span></b></div><br>";
            });



        }else{
          this.lat = Number(0.0);
          this.lng = Number(0.0);
          this.snippet = "";
          // clearInterval(this.interval);
          alert(data.error)
        }
      })
    }
    
  }

}
