import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessagingService } from '../../services/messaging.service';
import { MaskService } from '../../services/mask.service';

@Component({
  selector: 'app-bulkmessage',
  templateUrl: './bulkmessage.component.html',
  styleUrls: ['./bulkmessage.component.css']
})
export class BulkmessageComponent implements OnInit {

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
  msg:String="";
  msgchars:number;
  msgcount:number;
  campaignname:String;
  campaignpath:String;
  op:String="";
  account:String="";
  password:String="";
  cdate:String="";



  constructor(private authService:AuthService,private maskService:MaskService, private messagingService:MessagingService) { }

  ngOnInit() {
    this.getallmasks();
    
    this.msgchars = this.msg.length;
    this.msgcount = Math.ceil(this.msgchars/160);

    //this.gettemplates();
  }

  masksarr:any=[];
  getallmasks(){
    this.maskService.getactivatedmasks(this.authService.getSavedEmail()).subscribe(data=>{
      if(data.success){
        this.masksarr = data.data;
      }
    })
  }


  opchange(ev){
    // console.log(ev.target.value);
    this.op = ev.target.value;
    //console.log(this.op);
    
    this.gettemplates();
  }

  languagechange(ev){

  }

  registerbulk(){
    if(this.op == ""){
      this.op = "static";
    }

    let bulk = {
      name:this.name,
      language:this.language,
      type:this.op,
      campaign:this.campaignname,
      path:this.campaignpath,
      masking:this.masking,
      msg:this.msg,
      createdby:this.authService.getSavedEmail()
    }

    if(this.op == "static"){
      this.messagingService.registerbulk(bulk).subscribe(data=>{
        if(data.success){
          alert("Bulk Sent!");
          //location.reload();
  
        }else{
          alert(data.error);
        }
      });
    }else if(this.op == "dynamic"){
      this.messagingService.registerbulkdynamic(bulk).subscribe(data=>{
        if(data.success){
          alert("Bulk of "+data.records+" sent in "+data.timetaken+"ms!");
          //location.reload();
  
        }else{
          alert(data.error);
        }
      });
    }


    
  }

  templatechange(ev){
    this.msg = ev.target.value;
    this.msgchars = this.msg.length;
    this.msgcount = Math.ceil(this.msgchars/160);
  }

  campaignchange(ev){
    this.campaignpath = ev.target.value;
    this.campaignname = ev.target[ev.target.selectedIndex].text;

    // this.campaignname = ev.target;
    // console.log(ev.target.selectedIndex);
    
  }

  maskingchange(ev){

  }

  msgchange(ev){
    this.msgchars = this.msg.length;
    this.msgcount = Math.ceil(this.msgchars/160);
  }

  templatesArr:any[]=[];
  campaignsArr:any[]=[];
  gettemplates(){
    if(this.op==""){

      // this.messagingService.getallstatictemplates(this.authService.getSavedEmail()).subscribe(data=>{
      //     if(data.success){
      //       this.templatesArr = data.data;
      //       console.log(this.templatesArr);
      //     }
      // });

      this.messagingService.getallstaticcampaigns(this.authService.getSavedEmail()).subscribe(data=>{
        if(data.success){
          this.campaignsArr = data.data;
          console.log(this.campaignsArr);
        }
      });


      console.log("Get static templates");
    }else if(this.op=="static"){

      this.messagingService.getallstatictemplates(this.authService.getSavedEmail()).subscribe(data=>{
        if(data.success){
          this.templatesArr = data.data;
        }
      });

      this.messagingService.getallstaticcampaigns(this.authService.getSavedEmail()).subscribe(data=>{
        if(data.success){
          this.campaignsArr = data.data;
        }
      });



      console.log("Get static templates");
    }else if(this.op=="dynamic"){


      this.messagingService.getalldynamictemplates(this.authService.getSavedEmail()).subscribe(data=>{
        if(data.success){
          this.templatesArr = data.data;
        }
      });

      this.messagingService.getalldynamiccampaigns(this.authService.getSavedEmail()).subscribe(data=>{
        if(data.success){
          this.campaignsArr = data.data;
        }
      });


      console.log("Get dynamic templates");
    }
    
    
    
  }

}
