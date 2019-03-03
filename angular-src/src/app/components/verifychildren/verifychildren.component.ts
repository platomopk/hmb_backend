import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-verifychildren',
  templateUrl: './verifychildren.component.html',
  styleUrls: ['./verifychildren.component.css']
})
export class VerifychildrenComponent implements OnInit {

  constructor(private schoolservice:SchoolService) { }

  childsarr:any[];

  ngOnInit() {
    this.getchildren()
  }

  getchildren(){
    this.childsarr = [];
    var school = JSON.parse(localStorage.getItem("user"));
      this.schoolservice.getchildren({schoolname:school.name}).subscribe(data=>{
        if(data.success){          
          this.childsarr = data.data;          
        }else{
          console.log(data.error);
        }
      })
  }

  verify(id){
    this.schoolservice.markverify({id:id}).subscribe(data=>{
      if(data.success){
        alert("Successful!");
        this.getchildren();
      }else{
        console.log(data.error);
      }
    })
  }

}
