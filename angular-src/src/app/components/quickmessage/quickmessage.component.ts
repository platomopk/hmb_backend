import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {MessagingService} from '../../services/messaging.service';
import {MaskService} from '../../services/mask.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quickmessage',
  templateUrl: './quickmessage.component.html',
  styleUrls: ['./quickmessage.component.css']
})
export class QuickmessageComponent implements OnInit {

  name:String;
  language:String;
  masking:String;
  mobilenos:String="";
  msg:String="";
  msgchars:number;
  noofmsgs:number;
  preference:String;
  account:String;
  password:String;

  smallmessage:String="";

  verified:Boolean=false; 
  showspinner:Boolean=false;

  mobilenosarr:String[]=[];

  constructor(private messagingService : MessagingService,private maskService:MaskService, private authService:AuthService, private router:Router ) {
     
  }

  pc(){
    this.verified = false;
    
    //this.verifybalance(this.account,this.password,this.mobilenosarr.length);
  }

  masksarr:any=[];
  getallmasks(){
    this.maskService.getactivatedmasks(this.authService.getSavedEmail()).subscribe(data=>{
      if(data.success){
        this.masksarr = data.data;
      }
    })
  }
  
  verifybalance(){

    //this.mobilenosarr = this.mobilenos.trim().split(',');
    
    if(this.mobilenos == ''){
      alert("Enter mobile numbers first!");
      return false;
    }
    this.mobilenosarr = this.mobilenos.trim().split(',');

    this.showspinner=true;
    let creds = {
      loginId:this.account,
      loginPassword:this.password
    }
    this.messagingService.getAccountSummary(creds).subscribe(data=>{
      console.log(data,this.verified);
      if(data.success){
        // verify the condition
        //console.log(data.data.Total_Balance);
        if(this.mobilenosarr.length > parseInt(data.data.Total_Balance)){
          //console.log("return false");
          //alert("Unsufficient Balance");
          this.smallmessage = "Insufficient Balance";
          this.verified = false;
        }else{
          //console.log("return true");
          this.verified = true;
          this.smallmessage = "";
        }
        
      }else{
        this.smallmessage = "Invalid username/password";
        this.verified=false;
        
      }
      this.showspinner=false;
      //console.log(data);
    });
  }

  languagechange(ev){
    
  }

  maskingchange(ev){

  }

  templatechange(ev){
    this.msg = ev.target.value;
    this.msgchars = this.msg.length;
    this.noofmsgs = Math.ceil(this.msgchars/160);
  }

  messagechange(ev){
    this.msgchars = this.msg.length;
    this.noofmsgs = Math.ceil(this.msgchars/160);
  }

  ngOnInit() {
    this.getallmasks();
    this.getallstatictemplates();
    this.msgchars = this.msg.length;
    this.noofmsgs = Math.ceil(this.msgchars/160);
  }

  registerquick(){

    this.mobilenosarr = this.mobilenos.trim().split(',');

    if(this.mobilenosarr.length>11){
      alert("Mobile numbers must be less than 11.");
    }else{
      
          let quickObj = {
            name:this.name,
            language:this.language,
            masking:this.masking,
            mobilenos:this.mobilenosarr,
            msg:this.msg,
            msgchars:this.msgchars,
            noofmsgs:this.noofmsgs,
            preference:this.preference,
            createdby: this.authService.getSavedEmail(),
            account:this.account,
            password:this.password
          };
          this.messagingService.registerquick(quickObj).subscribe(data=>{
            //console.log(data);
            if(data.success){
              alert("Quick Message(s) : Sent") ;
              //location.reload(true);
            }else{
              alert(data.error);
            }
          });
          
    }

    

  }


  templateArr:any[]=[];
  getallstatictemplates(){
    this.messagingService.getallstatictemplates(this.authService.getSavedEmail())
    .subscribe(data=>{
      if(data.success){
        this.templateArr = data.data;
      }else{
        console.log("No Templates Found");
        
      }
    })
  }

}
