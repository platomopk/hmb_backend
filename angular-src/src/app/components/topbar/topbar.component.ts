import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  loggedIn:boolean;
  refreshed:boolean;
  sidebarShow:boolean;
  instanceid:String="null";

  constructor(private router:Router, private authService:AuthService) { 
    //this.loggedIn=false;
    this.sidebarShow=false;

  }

  ngOnInit() {
    if( localStorage.getItem('id_loggedIn') != null && localStorage.getItem('id_loggedIn')=='true'){
      this.loggedIn=true;

      // this.authService.getProfile().subscribe(
      //   data=>{
      //     this.instanceid = data._id;
      //   },
      //   err=>{
      //     console.log('token expired!');
      //     this.onLogout();
      //     return false;
      //   }
      // );

    }else{
      this.loggedIn=false;
    }
  }

  onLogout(){
    this.authService.onLogout();
    //localStorage.clear();
    this.router.navigate(['/home']);
  }

  onNewMessage(){
    this.sidebarShow = !this.sidebarShow;
  }

  onProfile(){
    this.router.navigate(['/profile']);
  }

}
