import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ContactService} from '../../services/contact.service';

@Component({
  selector: 'app-newcontact',
  templateUrl: './newcontact.component.html',
  styleUrls: ['./newcontact.component.css']
})
export class NewcontactComponent implements OnInit {

  fullname:String;
  phone:String;
  token:String;
  description:String;
  email:String;
  gender:String;
  createdby:String;

  constructor(private authService:AuthService,private contactService:ContactService) { }

  ngOnInit() {
  }

  registercontact(){
    let newContact = {
      fullname:this.fullname,
      phone:this.phone,
      token:this.token,
      description:this.description,
      email:this.email,
      gender:this.gender,
      createdby:this.authService.getSavedEmail()
    }

    this.contactService.registercontact(newContact).subscribe(data=>{
      if(data.success){
        alert("New contact addded");
      }else{
        alert("There was an error adding a new contact.");
      }
    });

    

  }

}
