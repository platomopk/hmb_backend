import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-templatenotification',
  templateUrl: './templatenotification.component.html',
  styleUrls: ['./templatenotification.component.css']
})
export class TemplatenotificationComponent implements OnInit {

  type:String;
  name:String;
  desc:String;
  createdby:String;

  constructor(private authService:AuthService,private notificationService:NotificationService) { }

  templatesArr:any[]=[];

  ngOnInit() {
    this.getalltemplates();
  }

  register(){

    // console.log("askjdhaksjdhkasjdh");
    
    let newTemplate = {
      type:this.type,
      name:this.name,
      desc:this.desc,
      createdby:this.authService.getSavedEmail()
    }

    // console.log(newTemplate);
    

    this.notificationService.registerTemplate(newTemplate).subscribe(data=>{
      if(data.success){
        alert("Template Created");
        this.getalltemplates();
      }else{
        alert("Not Created");
      }
    });


  }


  getalltemplates(){
    this.notificationService.getalltemplates(this.authService.getSavedEmail())
    .subscribe(data=>{
      if(data.success){
        this.templatesArr = data.data;
      }else{
        console.log("No templates found.");
      }
    });
  }

  removetemplate(id){
    this.notificationService.removetemplate(id).subscribe(data=>{
      if(data.success){
        alert("Template was successfully removed");
        this.getalltemplates();
      }else{
        alert("Not removed");
      }
    });
  }

}
