import { Component, OnInit } from '@angular/core';
import { MaskService } from '../../services/mask.service'

@Component({
  selector: 'app-mastermaskmoderation',
  templateUrl: './mastermaskmoderation.component.html',
  styleUrls: ['./mastermaskmoderation.component.css']
})
export class MastermaskmoderationComponent implements OnInit {

  configarr:any=[]

  constructor(private maskService:MaskService) { }

  ngOnInit() {
    this.getpendingmasks()
  }

  getpendingmasks(){
    this.maskService.getpendingmasks().subscribe(data=>{
      if(data.success){
        this.configarr = data.data;
      }
    })
  }
  
  activate(id){
    this.maskService.activatemask({id:id}).subscribe(data=>{
      if(data.success){
        alert('Successfully activated.');
        this.getpendingmasks();
      }else{
        alert(data.error);
      }
    })
  }

  ondelete(id){
    this.maskService.removemask(id).subscribe(data=>{
      if(data.success){
        alert("Successfully Deleted");
        this.getpendingmasks();
      }else{
        alert("Not Deleted");
      }
    }); 
  }

}
