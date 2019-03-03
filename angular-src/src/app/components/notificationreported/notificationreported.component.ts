import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notificationreported',
  templateUrl: './notificationreported.component.html',
  styleUrls: ['./notificationreported.component.css']
})
export class NotificationreportedComponent implements OnInit {

  notificationId:String;

  notificationArr:any[]=[];

  constructor(private route: ActivatedRoute,
    private router: Router,private authService:AuthService, private notificationService:NotificationService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.notificationId = params['notificationid'];
      console.log(this.notificationId);
      this.getallreported();
    });
  }

  getallreported(){
    this.notificationService.getAllnotificationreported(this.notificationId).subscribe(data=>{
      
      this.notificationArr = data[0].payload;
    });
  }

}
