import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessagingService } from '../../services/messaging.service';
import { HybridService } from '../../services/hybrid.service';

@Component({
  selector: 'app-hybridcompose',
  templateUrl: './hybridcompose.component.html',
  styleUrls: ['./hybridcompose.component.css']
})
export class HybridcomposeComponent implements OnInit {

  name:String;
  masking:String;
  language:String;
  msg:String="";
  msgchars:number;
  msgcount:number;
  locking:String;
  account:String;
  password:String;

  verified:boolean;
  spinner:boolean;

  constructor(private authService: AuthService, private hybridService:HybridService, private messagingService:MessagingService) { }

  ngOnInit() {
    this.msgchars = this.msg.length;
    this.msgcount = Math.ceil(this.msgchars/160);
  }

  register(){
    let hybrid = {
      name:this.name,
      masking:this.masking,
      language:this.language,
      msg:this.msg,
      locking:this.locking,
      createdby:this.authService.getSavedEmail(),
      account:this.account,
      password:this.password
    }

    this.hybridService.registerhybrid(hybrid).subscribe(data=>{
      if(data.success){
        alert("Message Sent");
        location.reload(true);
      }else{
        alert("Not Sent");
      }
    });


  }

  maskingchange(ev){

  }

  langchange(e){

  }


  msgchange(ev){
    this.msgchars = this.msg.length;
    this.msgcount = Math.ceil(this.msgchars/160);
  }

  lockchange(ev){
    this.locking = ev.target.value;
  }

  pc(ev){
    this.verified=false;
  }

  verify(){
    this.spinner=true;
    let creds = {
      loginId:this.account,
      loginPassword:this.password
    }
    this.messagingService.getAccountSummary(creds).subscribe(data=>{
      if(data.success){
        this.verified = true;
      }else{
        this.verified = false;
      }
      this.spinner=false;
    });
  }

}
