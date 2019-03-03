import { Component, OnInit } from '@angular/core';
//import * as $ from 'jquery';

declare var jQuery:any;

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  

  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    // jQuery().ready(function(){
    //   jQuery("#p").click(function(){
    //     alert("My Nigga");
    //   });
    // });
  }

}
