import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-verifydrivers',
  templateUrl: './verifydrivers.component.html',
  styleUrls: ['./verifydrivers.component.css']
})
export class VerifydriversComponent implements OnInit {

  constructor(private schoolservice:SchoolService) { }


  driverarr:any[];

  ngOnInit() {
    this.getdrivers()
  }

  getdrivers(){
    this.driverarr = [];
    var school = JSON.parse(localStorage.getItem("user"));
      this.schoolservice.getdrivers({schoolname:school.name}).subscribe(data=>{
        if(data.success){          
          this.driverarr = data.data;          
        }else{
          console.log(data.error);
        }
      })
  }

  verify(id){
    this.schoolservice.markverifydriver({id:id}).subscribe(data=>{
      if(data.success){
        alert("Successful!");
        this.getdrivers();
      }else{
        console.log(data.error);
      }
    })
  }
}
