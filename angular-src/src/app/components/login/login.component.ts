import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:String;
  password:String;

  constructor(
    private router:Router,
    private authService:AuthService,
    private schoolService:SchoolService
  ) {
    if( localStorage.getItem('id_loggedIn') != null && localStorage.getItem('id_loggedIn')=='true'){
      this.router.navigate(['/default']);
    }
  }

  ngOnInit() {
  }

  onLogin(){

    let school = {
      email:this.email,
      password:this.password
    }

    this.schoolService.loginSchool(school).subscribe(
      data => {
        if(data.success){
          if(data.school.activated && data.school.suspended == false){
            alert("You are logged in.");
            this.authService.storeUserData(data.token, data.school);
            this.router.navigate(['/default']);
          }else{
            alert("Your account is blocked." +
            " Please contact us at support@hmb.com for further assistance.");
            this.router.navigate(['/home/login']);
          }

        }else{
          alert(data.error);
          this.router.navigate(['/home/login']);
        }
        //console.log(data);
      }
    );

    //localStorage.clear();
    //localStorage.setItem("id_loggedIn","true");

    //console.log(localStorage.getItem("id_loggedIn"));

    //this.router.navigate(['/dashboard']);
  }

}
