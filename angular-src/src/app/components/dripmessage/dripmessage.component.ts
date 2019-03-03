import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {MessagingService} from '../../services/messaging.service';
import { MaskService} from '../../services/mask.service';


@Component({
  selector: 'app-dripmessage',
  templateUrl: './dripmessage.component.html',
  styleUrls: ['./dripmessage.component.css']
})
export class DripmessageComponent implements OnInit {

  date: Date = new Date();
	settings = {
		bigBanner: true,
		timePicker: true,
		format: 'dd-MM-yyyy HH:mm:ss',
    defaultOpen: false,
    closeOnSelect: true
  }
  
  name:String;
  language:String;
  masking:String;
  campaign:String;
  path:String;
  msg:String="";
  msgchars:number;
  msgcount:number;
  datefrom:String;
  dateto:String;
  frequency:String;
  timepayload:any[]=[];
  account:String;
  password:String;

  verified:boolean;
  spinner:boolean;


  arr:any[]=[];
  times:number=0;
  frequencychange(ev){
    this.arr = [];
    if(ev.target.value == "1"){
      this.arr.push({id:'ng1',value:1});
    }else if(ev.target.value == "2"){
      this.arr.push({id:'ng1',value:1});
      this.arr.push({id:'ng2',value:2});
    }else if(ev.target.value == "3"){
      this.arr.push({id:'ng1',value:1});
      this.arr.push({id:'ng2',value:2});
      this.arr.push({id:'ng3',value:3});
    }
    
    //this.arr.push(ev.target.value);
  }



  constructor(private authService:AuthService, private maskService:MaskService, private messagingService:MessagingService) { }

  campaignsArr:any[]=[];
  templatesArr:any[]=[];
  ngOnInit() {

    this.getallmasks();

    this.messagingService.getallstatictemplates(this.authService.getSavedEmail()).subscribe(data=>{
      if(data.success){
        this.templatesArr=data.data;
      }
    });

    this.messagingService.getallstaticcampaigns(this.authService.getSavedEmail()).subscribe(data=>{
      if(data.success){
        this.campaignsArr=data.data;
      }
    });


    this.msgchars = this.msg.length;
    this.msgcount = Math.ceil(this.msgchars/160);
    
  }

  masksarr:any=[];
  getallmasks(){
    this.maskService.getactivatedmasks(this.authService.getSavedEmail()).subscribe(data=>{
      if(data.success){
        this.masksarr = data.data;
      }
    })
  }

  campchange(ev){
    this.campaign = ev.target[ev.target.selectedIndex].text;
    this.path = ev.target.value;
  }

  templatechange(ev){
    this.msg = ev.target.value;
    this.msgchars = this.msg.length;
    this.msgcount = Math.ceil(this.msgchars/160);
  }

  msgchange(ev){

    this.msgchars = this.msg.length;
    this.msgcount = Math.ceil(this.msgchars/160);
  }

  objArr:any[]=[];
  test(){
    
    alert(document.getElementById('1')["value"]);
    
     //document.getElementsByName('times')
  }

  register(){
    var timespayload = [];
    if(this.frequency == "1"){
      timespayload.push({status:'',time:document.getElementById('1')["value"]});
    }else if(this.frequency == "2"){
      timespayload.push({status:'',time:document.getElementById('1')["value"]});
      timespayload.push({status:'',time:document.getElementById('2')["value"]});
    }else if(this.frequency == "3"){
      timespayload.push({status:'',time:document.getElementById('1')["value"]});
      timespayload.push({status:'',time:document.getElementById('2')["value"]});
      timespayload.push({status:'',time:document.getElementById('3')["value"]});
    }

    let drip = {
      name:this.name,
      language:this.language,
      masking:this.masking,
      campaign:this.campaign,
      path:this.path,
      msg:this.msg,
      datefrom:this.datefrom,
      dateto:this.dateto,
      frequency:this.frequency,
      timespayload:timespayload,
      createdby:this.authService.getSavedEmail()
    }

    this.messagingService.registerdrip(drip).subscribe(data=>{
      if(data.success){
        alert("Drip Created.")
      }else{
        alert(data.error.toString());
      }
    });

  }

  langchange(ev){

  }

  maskingchange(ev){

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
