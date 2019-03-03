import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {MessagingService} from '../../services/messaging.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-digital',
  templateUrl: './digital.component.html',
  styleUrls: ['./digital.component.css']
})

export class DigitalComponent implements OnInit {

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
  reach:String="";

  msgcount:number;
  campaignname:String;
  campaignpath:String;
  op:String="";
  cdate:String="";

  smallmessage:String="";

  verified:Boolean=false; 
  showspinner:Boolean=false;

  mobilenosarr:String[]=[];

  constructor(private messagingService : MessagingService, private authService:AuthService, private router:Router ) {
     
  }

  opchange(ev){
    // console.log(ev.target.value);
    this.op = ev.target.value;
    //console.log(this.op);
    
    this.gettemplates();
  }


  campaignchange(ev){
    this.campaignpath = ev.target.value;
    this.campaignname = ev.target[ev.target.selectedIndex].text;

    // this.campaignname = ev.target;
    // console.log(ev.target.selectedIndex);
    
  }

  registerwhatsapp(){
    if(this.op == ""){
      this.op = "static";
    }

    console.log(this.op);
    

    let obj = {
      name:this.name,
      language:this.language,
      type:this.op,
      campaign:this.campaignname,
      path:this.campaignpath,
      msg:this.msg,
      createdby:this.authService.getSavedEmail()
    }

    if(this.op == "static"){
      this.messagingService.registerdigitalstatic(obj).subscribe(data=>{
        console.log(data);
        
        if(data.success){
          alert('Successful!' + data.timetaken + data.records);
        }else{
          alert(data.error)
        }
      })
    }else{
      this.messagingService.registerdigitaldynamic(obj).subscribe(data=>{
        if(data.success){
          alert('Successful!' + data.timetaken + data.records);
        }else{
          alert(data.error)
        }
      })
    }


    // if(this.name.length != 0 && this.mobilenos.length !=0 && this.msg.length !=0){
    //   this.mobilenosarr = this.mobilenos.split(',')
    //   let obj = {
    //     name: this.name,
    //     mobilenos: this.mobilenosarr,
    //     message:this.msg,
    //     createdby: this.authService.getSavedEmail()
    //   }

    //   this.messagingService.registerdigital(obj).subscribe(data=>{
    //     if(data.success){
    //       alert('Successful!');
    //       location.reload(true);
    //     }else{
    //       alert('Not Successful!');
    //     }
    //   });
    //   // console.log(obj);
      
    // }else{
    //   alert('Fields are missing.')
    // }

  }

  oprchange(ev){
    //alert(ev.target.value);
    this.reach = ev.target.value;
  }

  pc(){
    this.verified = false;
    //this.verifybalance(this.account,this.password,this.mobilenosarr.length);
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
      createdby:this.authService.getSavedEmail(),
      account:this.account,
      password:this.password,
      campaigndate:this.cdate
    }

    if(this.op == "static"){
      this.messagingService.registerbulk(bulk).subscribe(data=>{
        if(data.success){
          alert("Bulk Sent!");
          location.reload();
  
        }else{
          alert(data.error);
        }
      });
    }else if(this.op == "dynamic"){
      this.messagingService.registerbulkdynamic(bulk).subscribe(data=>{
        if(data.success){
          alert("Bulk of "+data.records+" sent in "+data.timetaken+"ms!");
          location.reload();
  
        }else{
          alert(data.error);
        }
      });
    }


    
  }

  
  // verifybalance(){
  //   //this.mobilenosarr = this.mobilenos.trim().split(',');
  //   if(this.mobilenos == ''){
  //     alert("Enter mobile numbers first!");
  //     return false;
  //   }
  //   this.mobilenosarr = this.mobilenos.trim().split(',');

  //   this.showspinner=true;
  //   let creds = {
  //     loginId:this.account,
  //     loginPassword:this.password
  //   }
  //   this.messagingService.getAccountSummary(creds).subscribe(data=>{
  //     console.log(data,this.verified);
  //     if(data.success){
  //       // verify the condition
  //       //console.log(data.data.Total_Balance);
  //       if(this.mobilenosarr.length > parseInt(data.data.Total_Balance)){
  //         //console.log("return false");
  //         //alert("Unsufficient Balance");
  //         this.smallmessage = "Insufficient Balance";
  //         this.verified = false;
  //       }else{
  //         //console.log("return true");
  //         this.verified = true;
  //         this.smallmessage = "";
  //       }
        
  //     }else{
  //       this.smallmessage = "Invalid username/password";
  //       this.verified=false;
        
  //     }
  //     this.showspinner=false;
  //     //console.log(data);
  //   });
  // }


  templatechange(ev){
    this.msg = ev.target.value;
    this.msgchars = this.msg.length;
    this.noofmsgs = Math.ceil(this.msgchars/160);
  }

  msgchange(ev){
    this.msgchars = this.msg.length;
    this.noofmsgs = Math.ceil(this.msgchars/160);
  }

  ngOnInit() {
    //this.getallstatictemplates();
    this.msgchars = this.msg.length;
    this.noofmsgs = Math.ceil(this.msgchars/160);
  }

  // registerquick(){

  //   this.mobilenosarr = this.mobilenos.trim().split(',');

  //   if(this.mobilenosarr.length>11){
  //     alert("Mobile numbers must be less than 11.");
  //   }else{
      
  //         let quickObj = {
  //           name:this.name,
  //           language:this.language,
  //           masking:this.masking,
  //           mobilenos:this.mobilenosarr,
  //           msg:this.msg,
  //           msgchars:this.msgchars,
  //           noofmsgs:this.noofmsgs,
  //           preference:this.preference,
  //           createdby: this.authService.getSavedEmail(),
  //           account:this.account,
  //           password:this.password
  //         };
  //         this.messagingService.registerquick(quickObj).subscribe(data=>{
  //           //console.log(data);
  //           if(data.success){
  //             alert("Quick Message(s) : Sent") ;
  //             //location.reload(true);
  //           }else{
  //             alert(data.error);
  //           }
  //         });
          
  //   }

    

  // }


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
