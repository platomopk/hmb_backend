import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service'

@Component({
  selector: 'app-masterissuemoderation',
  templateUrl: './masterissuemoderation.component.html',
  styleUrls: ['./masterissuemoderation.component.css']
})
export class MasterissuemoderationComponent implements OnInit {

  configarr:any=[]

  constructor(private issueService:IssueService) { }

  ngOnInit() {
    this.getpendingissues()
  }

  getpendingissues(){
    this.issueService.getpendingissues().subscribe(data=>{
      if(data.success){
        this.configarr = data.data;
      }
    })
  }
  
  resolve(id){
    this.issueService.resolveissue({id:id}).subscribe(data=>{
      if(data.success){
        alert('Successfully resolved.');
        this.getpendingissues();
      }else{
        alert(data.error);
      }
    })
  }

}
