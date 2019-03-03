import { Component, OnInit } from '@angular/core';
import { PricingService } from '../../services/pricing.service'

@Component({
  selector: 'app-mastercreditmoderation',
  templateUrl: './mastercreditmoderation.component.html',
  styleUrls: ['./mastercreditmoderation.component.css']
})
export class MastercreditmoderationComponent implements OnInit {

  configarr:any=[]

  constructor(private pricingService:PricingService) { }

  ngOnInit() {
    this.getpendingcredits()
  }

  getpendingcredits(){
    this.pricingService.getpendingcredits().subscribe(data=>{
      if(data.success){
        this.configarr = data.data;
      }
    })
  }
  
  receive(id,email){
    this.pricingService.receivecreditpayment({id:id}).subscribe(data=>{
      if(data.success){
        alert('Successfully recieved.');
        this.getpendingcredits();
      }else{
        alert(data.error);
      }
    })
  }

}
