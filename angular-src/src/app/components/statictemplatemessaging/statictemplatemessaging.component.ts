import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-statictemplatemessaging',
  templateUrl: './statictemplatemessaging.component.html',
  styleUrls: ['./statictemplatemessaging.component.css']
})
export class StatictemplatemessagingComponent implements OnInit {

  constructor(private authService : AuthService , private messagingService: MessagingService) { }

  name:String;
  description:String;
  type:String;

  ngOnInit() {
    this.getalltemplates();
  }

  registertemplate(){
    let template = {
      name:this.name,
      description:this.description,
      type:this.type,
      createdby:this.authService.getSavedEmail()
    };

    this.messagingService.registertemplate(template).subscribe(data=>{
      if(data.success){
        alert("Template Registered");
        this.getalltemplates();
      }else{
        alert("Not registered.");
      }
    });


  }

  templateArr:any[]=[];
  getalltemplates(){
    this.messagingService.getalltemplates(this.authService.getSavedEmail())
    .subscribe(data=>{
      if(data.success){
        this.templateArr = data.data;
      }else{
        console.log("No Templates Found");
        
      }
    })
  }

  removetemplate(id){
    this.messagingService.removetemplate(id).subscribe(data=>{
      if(data.success){
        alert("Successfully Removed");
        this.getalltemplates();
      }else{
        alert("Not removed");
      }
    });
  }


  typechange(ev){

  }

}
