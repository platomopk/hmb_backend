import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-composemessage',
  templateUrl: './composemessage.component.html',
  styleUrls: ['./composemessage.component.css']
})
export class ComposemessageComponent implements OnInit {

  constructor(private router:Router) { }

  digital:Boolean=false;


  ngOnInit() {

    let user = JSON.parse(localStorage.getItem('user'));
    if(user.rights.indexOf("digital")===-1){
      this.digital = false;
    }else{
      this.digital = true;
    }

    this.router.navigate(['/messaging/compose/quick']);
  }

}
