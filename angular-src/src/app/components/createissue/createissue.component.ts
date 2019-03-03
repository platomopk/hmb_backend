import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MaskService } from '../../services/mask.service';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-createissue',
  templateUrl: './createissue.component.html',
  styleUrls: ['./createissue.component.css']
})
export class CreateissueComponent implements OnInit {

  maskforiegn:String;
  maskname:String;
  feature:String;
  problem:String;
  remarks:String;
  createdby:String;

  masksArr:any[]=[];

  constructor(private authService:AuthService,private maskService:MaskService,private issueService:IssueService) { }

  ngOnInit() {
    this.getMasks();
    this.createdby = this.authService.getSavedEmail();
  }

  registerissue(){
    let newIssue = {
      maskforiegn:this.maskforiegn,
      maskname:this.maskname,
      feature:this.feature,
      problem:this.problem,
      remarks:this.remarks,
      createdby:this.createdby
    }
    
    //this.issueService.registerissue(newIssue);
    this.issueService.registerissue(newIssue).subscribe(data=>{
      if (data.success){
        alert("Issue registered!");
        console.log(data.issue);
      }else{
        alert("Issue not registered!");
      }
    });
    
  }

  getMasks(){
    this.maskService.getactivatedmasks(this.authService.getSavedEmail())
    .subscribe(data=>{
      this.masksArr = data.data;
    });
  }

  maskchange(event){
    //console.log(event.target.value);
    this.maskforiegn = event.target.value;
    this.maskname = event.target.options[event.target.selectedIndex].text;
    //console.log(this.maskforiegn,this.maskname);
    
  }

  featurechange(event){
    // console.log(event.target.value);
    this.feature = event.target.value;
  }

}
