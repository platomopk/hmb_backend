import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {IssueService} from '../../services/issue.service';

@Component({
  selector: 'app-issuedashboard',
  templateUrl: './issuedashboard.component.html',
  styleUrls: ['./issuedashboard.component.css']
})
export class IssuedashboardComponent implements OnInit {

  issuesArr:any[]=[];

  constructor(
    private issueService:IssueService,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.getallissues();
  }

  getallissues(){
    this.issueService.getallissues(this.authService.getSavedEmail())
    .subscribe(data=>{
      console.log(data);
      if(data.success){
        this.issuesArr = data.data;
      }else{
        console.log("No issues registered.");
      }
    });
  }

  remove(id){
    this.issueService.removeissue(id).subscribe(data=>{
      if(data.success){
        alert("Removed");
        this.getallissues();
      }else{
        alert("Not Removed");
      }
    });
  }

}
