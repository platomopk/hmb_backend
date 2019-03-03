import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-masteraccountmoderation',
  templateUrl: './masteraccountmoderation.component.html',
  styleUrls: ['./masteraccountmoderation.component.css']
})
export class MasteraccountmoderationComponent implements OnInit {


  usersarr:any = [];

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.usersarr = [];
    this.getpending();
  }

  getpending(){
    this.auth.getpending().subscribe(data=>{
      if(data.success){
        this.usersarr = data.data;
      }else{
        alert(data.error);
      }
    })
  }

  activate(email){
    let e={
      email:email
    }
    this.auth.activateaccount(e).subscribe(data=>{
      if(data.success){
        alert('Success')
        this.getpending();
      }else{
        alert(data.err)
      }
    })
  }

}
