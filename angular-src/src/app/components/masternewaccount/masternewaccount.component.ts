import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-masternewaccount',
  templateUrl: './masternewaccount.component.html',
  styleUrls: ['./masternewaccount.component.css']
})
export class MasternewaccountComponent implements OnInit {

  fullname:String;
  phone:String;
  email:String;
  password:String;
  type:String="";
  rights:String[];

  constructor(
    private validateService:ValidateService,
    private authService:AuthService,
    private router:Router
  ) {  }

  ngOnInit() {
  }

  onRegister(){
    // rights:['dashboard','messaging','notification','hybrid','reporting','contacts','tracker','pricing','settings'],
    if(this.type == '')
    {
      return false;
    }
    let user = {};

    if(this.type == 'regular'){
      user = {
        fullname: this.fullname,
        phone: this.phone,
        email: this.email,
        password: this.password,
        rights:['contacts','tracker','pricing','settings'],
        isparent:true,
        isdelegate:false,
        parent:null,
        parents:[],
        type:this.type,
        isactivated:true
      }
    }else if(this.type == 'telco'){
      user = {
        fullname: this.fullname,
        phone: this.phone,
        email: this.email,
        password: this.password,
        rights:['contacts','tracker','pricing','settings'],
        isparent:true,
        isdelegate:false,
        parent:null,
        parents:[],
        type:this.type,
        isactivated:true
      }
    }else if(this.type == 'lea'){
      user = {
        fullname: this.fullname,
        phone: this.phone,
        email: this.email,
        password: this.password,
        rights:['contacts','tracker','pricing','settings'],
        isparent:true,
        isdelegate:false,
        parent:null,
        parents:[],
        type:this.type,
        isactivated:true
      }
    }
    
    
    this.authService.registerUser(user)
    .subscribe(data=>{
      if(data.success){
        alert("User registered successfully.");
      }else{
        alert("Something went wrong. Email might already be registered");
      }
    });
    
  }

}
