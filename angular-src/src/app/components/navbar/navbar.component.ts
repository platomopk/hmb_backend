import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn:boolean;

  messaging:boolean;
  notification:boolean;
  hybrid:boolean;
  reporting:boolean;
  contacts:boolean;
  tracker:boolean;
  pricing:boolean;
  settings:boolean;
  dashboard:boolean;
  lea:boolean;
  master:boolean;

  constructor(private authService:AuthService) { 
    //this.loggedIn = false;
  }

  setRights(){
    const userStr = localStorage.getItem('user');
    const userObj = JSON.parse(userStr);
    const rights = userObj.rights;

    if(userObj.type == "sa"){
      this.master = true;
      return false;
    }else{
      this.master = false;
    }

    if(userObj.type == "lea"){
      this.lea = true;
      return false;
    }else{
      this.lea = false;
    }

    if(rights.includes('messaging')){
      this.messaging = true;
    }
    if(rights.includes('dashboard')){
      this.dashboard = true;
    }
    if(rights.includes('notification')){
      this.notification = true;
    }
    if(rights.includes('hybrid')){
      this.hybrid = true;
    }
    if(rights.includes('contacts')){
      this.contacts = true;
    }
    if(rights.includes('reporting')){
      this.reporting = true;
    }
    if(rights.includes('tracker')){
      this.tracker = true;
    }
    if(rights.includes('pricing')){
      this.pricing = true;
    }
    if(rights.includes('settings')){
      this.settings = true;
    }
  }

  ngOnInit() {
    //this.setRights();

    // this.authService.getRights().subscribe(data =>{
    //   console.log(data);
    // });


    if( localStorage.getItem('id_loggedIn') != null && localStorage.getItem('id_loggedIn')=='true'){
      this.loggedIn=true;
    }else{
      this.loggedIn=false;
    }
  }

}
