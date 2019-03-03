import { Component, OnInit } from '@angular/core';
import {SchoolService} from '../../services/school.service'

@Component({
  selector: 'app-searchdrivers',
  templateUrl: './searchdrivers.component.html',
  styleUrls: ['./searchdrivers.component.css']
})
export class SearchdriversComponent implements OnInit {

  cnic:String='';
  regid:String='';
  searched:boolean = false;
  schoolname:any;
  childarr:any[];

  constructor(private schoolService:SchoolService) { }


  ngOnInit() {
    let user = JSON.parse(localStorage.getItem("user"));
    this.schoolname = user.name;
}

search(){
  if(this.cnic == '' && this.regid == ''){
    alert("Please enter regid or cnic.")
  }else if(this.cnic == '' && this.regid != ''){
    this.viaregid(this.regid);
    this.searched = true;
  }else if(this.regid == '' && this.cnic != ''){
    this.viacnic(this.cnic);
    this.searched = true;
  }
}

viaregid(regid){
  this.childarr = [];
  this.schoolService.searchdriverbyregid({regid:regid,schoolname:this.schoolname}).subscribe(data=>{
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

viacnic(cnic){
  this.childarr = []
  this.schoolService.searchdriverbycnic({cnic:cnic,schoolname:this.schoolname}).subscribe(data=>{
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
