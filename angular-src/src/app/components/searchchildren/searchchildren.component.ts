import { Component, OnInit } from '@angular/core';
import {SchoolService} from '../../services/school.service'

@Component({
  selector: 'app-searchchildren',
  templateUrl: './searchchildren.component.html',
  styleUrls: ['./searchchildren.component.css']
})
export class SearchchildrenComponent implements OnInit {


  name:String='';
  rollnumber:String='';
  searched:boolean = false;
  schoolname:any;
  childarr:any[];

  constructor(private schoolService:SchoolService) { }

  ngOnInit() {
      let user = JSON.parse(localStorage.getItem("user"));
      this.schoolname = user.name;
  }

  search(){
    if(this.name == '' && this.rollnumber == ''){
      alert("Please enter rollnumber or name.")
    }else if(this.name == '' && this.rollnumber != ''){
      this.viarollnumber(this.rollnumber);
      this.searched = true;
    }else if(this.rollnumber == '' && this.name != ''){
      this.vianame(this.name);
      this.searched = true;
    }
  }

  viarollnumber(rollnumber){
    this.childarr = [];
    this.schoolService.searchchildbyrollnumber({rollnumber:rollnumber,schoolname:this.schoolname}).subscribe(data=>{
      if(data.success){
        console.log(data.data);
        this.childarr = data.data;
        this.searched = false;
      }else{
        alert(data.error);
        this.searched = false;
      }
    })
  }

  vianame(name){
    this.childarr = []
    this.schoolService.searchchildbyname({fullname:name,schoolname:this.schoolname}).subscribe(data=>{
      if(data.success){
        this.childarr = data.data;
        console.log(data.data);
        this.searched = false;
      }else{
        alert(data.error);
        this.searched = false;
      }
    })
  }

}
