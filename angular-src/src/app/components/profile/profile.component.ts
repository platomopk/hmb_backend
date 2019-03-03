import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // user:Object;

  fullname:String;
  phone:String;
  email:String;
  password:String;
  oldpassword:String="";
  newpassword:String="";
  user:any;
  

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit() {
    // get the user id
    const ide = localStorage.getItem('user');
    this.user = JSON.parse(ide);


    var obj = {
      id:this.user._id
    };


    //get the user info
    this.authService.getProfilePost(obj).subscribe(
      data => {
        // this.user = data.user;
        //console.log(data);
        this.fullname = data.data.name;
        this.phone = data.data.phone;
        this.email = data.data.email;

      },
      err => {
        //alert('Token Expired!');
        console.log(err);
        this.authService.onLogout();
        this.router.navigate(['/home/login']);
        
        return false;
      }
    );
  }

  onPasswordUpdate(){
    if(this.newpassword == ""){
      alert('Empty fields!');
      return false;
    }
    let obj = {
      id:this.user._id,
      oldpassword:this.oldpassword,
      newpassword:this.newpassword
    }

    this.authService.updateProfilePassword(obj).subscribe(data =>{
      if(data.success){
        // this.authService.storeUserData(data.token,data.user);
        alert('Successfully updated!');
        // this.authService.onLogout();
        // this.router.navigate(['/home/login']);

      }else{
        alert(data.error);
      }
    });
  }

  onProfileUpdate(){
    const user = {
      id: this.user._id,
      name : this.fullname,
      phone : this.phone
    }

    this.authService.updateProfile(user).subscribe(data =>{
      if(data.success){
        // this.authService.storeUserData(data.token,data.user);
        alert('Successfully updated!');
        // this.authService.onLogout();
        // this.router.navigate(['/home/login']);

      }else{
        alert(data.error);
      }
    });
  }

  

}
