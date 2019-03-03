import { Component, OnInit } from '@angular/core';
import { PricingService } from '../../services/pricing.service'

@Component({
  selector: 'app-masterbundlemoderation',
  templateUrl: './masterbundlemoderation.component.html',
  styleUrls: ['./masterbundlemoderation.component.css']
})
export class MasterbundlemoderationComponent implements OnInit {

  configarr:any=[]

  constructor(private pricingService:PricingService) { }

  ngOnInit() {
    this.getpendingconfigs()
  }

  getpendingconfigs(){
    this.pricingService.getpendingconfigs().subscribe(data=>{
      if(data.success){
        this.configarr = data.data;
      }
    })
  }
  
  receive(id,email){
    this.pricingService.receivebundlepayment({id:id}).subscribe(data=>{
      if(data.success){
        alert('Successfully recieved.');
        this.getpendingconfigs();
      }else{
        alert(data.error);
      }
    })
  }

}
