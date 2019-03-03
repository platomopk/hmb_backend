import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-composenotification',
  templateUrl: './composenotification.component.html',
  styleUrls: ['./composenotification.component.css']
})
export class ComposenotificationComponent implements OnInit {

  preference:String;
  topic:String;
  name:String;
  category:String;
  language:String;
  message:String="";
  createdby:String;

  messagelen:Number;

  preferenceselected:Boolean;

  templatesArr:any[]=[];

  constructor(private authService:AuthService, private notificationService:NotificationService) { }

  ngOnInit() {
    this.messagelen = this.message.length;
    this.getallnotificationtemplates();
  }

  prefchange(event){
    if(this.preference == 'db'){
      this.preferenceselected=false;
    }else{
      this.preferenceselected=true;
    }
  }

  getallnotificationtemplates(){
    this.notificationService.getalltemplates(this.authService.getSavedEmail()).subscribe(data=>{
      // console.log(data.data);
      
      this.templatesArr = data.data;
    });
  }

  templatechange(event){
    this.message = event.target.value;
    this.messagelen = this.message.length;
    
  }

  register(){
    let campaign; 
    
    if(this.topic == undefined){
      campaign = {
        preference:this.preference,
        topic:'',
        name:this.name,
        category:this.category,
        language:this.language,
        message:this.message,
        createdby:this.authService.getSavedEmail()
      }
    }else{
      campaign = {
        preference:this.preference,
        topic:this.topic,
        name:this.name,
        category:this.category,
        language:this.language,
        message:this.message,
        createdby:this.authService.getSavedEmail()
      }
    }

    this.notificationService.registerNotificationCampaign(campaign).subscribe(data=>{
      if(data.success){
        // console.log(data);
        
        alert("Campaign successfully created.");
      }else{
        alert("Not created. Try another name.");
      }
    });
  }

  k(e){
    this.messagelen = this.message.length;
  }

}
