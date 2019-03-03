import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MessagingService} from '../../services/messaging.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  user:any;

  constructor(private auth:AuthService, private msgService:MessagingService) { }

  ngOnInit() {
    let obj = localStorage.getItem('user');
    this.user = JSON.parse(obj)
  }




}
