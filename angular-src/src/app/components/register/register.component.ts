import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { SchoolService } from '../../services/school.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name:String;
  phone:String;
  email:String;
  password:String;
  location:String;
  address:String;
  city:String="";
  rights:String[];

  constructor(
    private validateService:ValidateService,
    private authService:AuthService,
    private schoolService:SchoolService,
    private router:Router
  ) {  }

  ngOnInit() {

  }

  getlocation(){
    if(window.navigator.geolocation){
      window.navigator.geolocation.getCurrentPosition(position=>{
        this.location = position.coords.latitude.toFixed(5)+","+position.coords.longitude.toFixed(5);
        
      },error=>{
        switch (error.code) {
          case 1:
              console.log('Permission denied');
              break;
          case 2:
              console.log('Position Unavailable');
              break;
          case 3:
              console.log('Timeout');
              break;
      }
      });
    }
  }

  onRegister(){
    // rights:['dashboard','messaging','notification','hybrid','reporting','contacts','tracker','pricing','settings'],
    if(this.city == '' || this.location == '')
    {
      return false;
    }
    
    let school = {
      city: this.city,
      name:this.name,
      phone: this.phone,
      address:this.address,
      location:this.location,
      email: this.email,
      password: this.password
    }

    console.log(school);
    
    this.schoolService.registerSchool(school)
    .subscribe(data=>{
      if(data.success){
        //this.flashMessagesService.show('You are now registered. You can now login.', { cssClass: 'alert-success', timeout: 2000 });
        alert("You are now registered. You can now login.");
        console.log("You are now registered. You can now login.");
        this.router.navigate(['/home/login']);
      }else{
        //this.flashMessagesService.show('Something went wrong.', { cssClass: 'alert-danger', timeout: 2000 });
        alert("Something went wrong. Email might already be registered");
        console.log("Something went wrong");
        this.router.navigate(['/home/register']);
      }
    });
    
  }

}
