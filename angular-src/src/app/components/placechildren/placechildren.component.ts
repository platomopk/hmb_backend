import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service'

@Component({
  selector: 'app-placechildren',
  templateUrl: './placechildren.component.html',
  styleUrls: ['./placechildren.component.css']
})
export class PlacechildrenComponent implements OnInit {

  child:any[]=[]; driver:any[];
  schoolname:any;

  childid:any="";
  driverid:any="";

  constructor(private schoolService:SchoolService) { }

  ngOnInit() {
      var ob = JSON.parse(localStorage.getItem("user"));
      this.schoolname = ob.name;

      this.driverlessstudents();
      this.availabledrivers();
  }

  driverlessstudents(){
    this.child= [];
      this.schoolService.getdriverlessstudents({schoolname:this.schoolname}).subscribe(data=>{
        if(data.success){
          
          this.child = data.data;
          console.log(this.child);
        }else{
          alert(data.error);
        }
      });
  }

  availabledrivers(){
    this.driver= [];
      this.schoolService.getavailabledrivers({schoolname:this.schoolname}).subscribe(data=>{
        if(data.success){
          this.driver = data.data;
          console.log(this.driver);
        }else{
          alert(data.error);
        }
      });
  }

  placechild(){
    if(this.childid == "" && this.driverid == ""){
        alert("Please select childs and drivers first.");
        return false;
    }

    this.schoolService.placechild({childid:this.childid,driverid:this.driverid,schoolname:this.schoolname}).subscribe(data=>{
      if(data.success){
        alert("Successful.")
        location.reload();
      }else{
        alert(data.error);
      }
    });

  }

  childchange(e){
    this.childid = e.target.value;    
  }

  driverchange(e){
    this.driverid = e.target.value;    
  }

}
