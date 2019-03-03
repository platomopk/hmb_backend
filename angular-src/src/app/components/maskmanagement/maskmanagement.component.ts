import { Component, OnInit } from '@angular/core';
import { MaskService } from '../../services/mask.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-maskmanagement',
  templateUrl: './maskmanagement.component.html',
  styleUrls: ['./maskmanagement.component.css']
})
export class MaskmanagementComponent implements OnInit {

  mask:String;
  type:String;
  description:String;
  

  searchString:String;

  // get masks data
  dataArr:any[]=[];

  constructor(private maskService:MaskService, private router:Router, private auth:AuthService) { }

  ngOnInit() {

    this.getAllMasks();
  }

  createmasktypechange(event){
    this.type=event.target.value;
  }

  createMask(){
    if(this.mask.length>11){
      alert('This field can only be 11 chars long.')
      return false;
    }
    let newMask ={
      mask:this.mask,
      type:this.type,
      description:this.description,
      createdby:this.auth.getSavedEmail()
    }

    this.maskService.registermask(newMask).subscribe(data=>{
      if(data.success){
        alert("Successfully Created");
        this.getAllMasks();
      }else{
        alert("Mask already registered.");
      }
    });    
  }

  getAllMasks(){
    this.maskService.getallmask(this.auth.getSavedEmail()).subscribe(data=>{
      this.dataArr = data.data;
    }); 
  }

  ondelete(id){
    this.maskService.removemask(id).subscribe(data=>{
      if(data.success){
        alert("Successfully Deleted");
        this.getAllMasks();
      }else{
        alert("Not Deleted");
      }
    }); 
  }

}
