import { Component, OnInit } from '@angular/core';
import {PricingService} from '../../services/pricing.service';
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-buybundles',
  templateUrl: './buybundles.component.html',
  styleUrls: ['./buybundles.component.css']
})
export class BuybundlesComponent implements OnInit {

  bundle:String;
  email:String;
  bundlearr:any[]=[];

  _expiry:String;_encryption:String;_featureset:String;
  _smscredit:String="0";_whatsappcredit:String="0";
  _tpsms:String="0";_tpwa:String="0";
  cost:number=0;
  items:String="";

  itemscredit:String="";
  costcredit:number=0;

  constructor(private pricingService:PricingService, private auth:AuthService) { }

  ngOnInit() {
    let userob = localStorage.getItem('user');
    let u=JSON.parse(userob);
    this.email = u.email;

    this.getAllBundles();
    this.getAllCredit();
  }

  onChangeBundle(event){
    this.bundle=event.target.value;
  }

  selectchangecredit(event){
    this.costcredit = 0;
    this.itemscredit = "" ;

        if(this._smscredit == "1000" ){
      this.costcredit+=100;
      this.itemscredit+="SMS Credit = 100 PKR \n";
    }else if(this._smscredit == "10000"){
      this.itemscredit+="SMS Credit = 1000 PKR \n";
      this.costcredit+=1000;
    }else if(this._smscredit == "100000"){
      this.costcredit+=2000;
      this.itemscredit+="SMS Credit = 2000 PKR \n";
    }

    if(this._whatsappcredit == "1000" ){
      this.costcredit+=100;
      this.itemscredit+="WhatsApp Credit = 100 PKR \n";
    }else if(this._whatsappcredit == "10000"){
      this.costcredit+=1000;
      this.itemscredit+="WhatsApp Credit = 1000 PKR \n";
    }else if(this._whatsappcredit == "100000"){
      this.costcredit+=2000;
      this.itemscredit+="WhatsApp Credit = 2000 PKR \n";
    }

  }

  selectchange(event){
    this.cost = 0;
    this.items = "" ;

    // expiry
    if(this._expiry == "1"){
      this.cost+=5;
      this.items+="Expiry for 1 Month = 5 PKR \n";
    }else if(this._expiry == "2"){
      this.cost+=10;
      this.items+="Expiry for 2 Months = 10 PKR \n";
    }else if(this._expiry == "3"){
      this.cost+=15;
      this.items+="Expiry for 3 Months = 15 PKR \n";
    }
    
    // enc
    if(this._encryption == "enable" ){
      this.cost+=5000;
      this.items+="Encryption = 5000 PKR \n";
    }else if(this._encryption=="disable"){
      this.cost+=0;
      this.items+="Encryption = 0 PKR \n";
    }

    // feaut
    if(this._featureset == "messaging" ){
      this.cost+=0;
      this.items+="SMS = 0 PKR \n";
    }else if(this._featureset=="digital"){
      this.cost+=1000;
      this.items+="WhatsApp = 1000 PKR \n";
    }else if(this._featureset=="messaging,digital"){
      this.cost+=2000;
      this.items+="SMS & WhatsApp = 2000 PKR \n";
    }



    if(this._tpsms == "10" ){
      this.cost+=100;
      this.items+="Throughput for SMS = 100 PKR \n";
    }else if(this._tpsms == "50"){
      this.cost+=1000;
      this.items+="Throughput for SMS = 1000 PKR \n";
    }else if(this._tpsms == "100"){
      this.cost+=2000;
      this.items+="Throughput for SMS = 2000 PKR \n";
    }else if(this._tpsms == "0"){
      this.cost+=0;
      this.items+="Throughput for SMS = 0 PKR \n";
    }

    if(this._tpwa == "10" ){
      this.cost+=100;
      this.items+="Throughput for WhatsApp = 100 PKR \n";
    }else if(this._tpwa == "50"){
      this.cost+=1000;
      this.items+="Throughput for WhatsApp = 1000 PKR \n";
    }else if(this._tpwa == "100"){
      this.cost+=2000;
      this.items+="Throughput for WhatsApp = 2000 PKR \n";
    }else if(this._tpwa == "0"){
      this.cost+=0;
      this.items+="Throughput for WhatsApp = 0 PKR \n";
    }
  }

  buycredit(){
    let credit = {
      smscredit:this._smscredit,
      whatsappcredit:this._whatsappcredit,
      from:'sa@mangotree.com',
      to:this.auth.getSavedEmail(),
      cost:this.costcredit,
      payment:false,
      createdby:this.auth.getSavedEmail()
    }

    this.pricingService.registercredit(credit).subscribe(data=>{
      if(data.success){
        alert('Credit requested!');
        location.reload(true);
      }else{
        alert(data.err);
      }
    })
  }

  createbundle(){
    let newBundle = {
      expiry:this._expiry,
      encryption:this._encryption,
      featureset:this._featureset,
      smstp:this._tpsms,
      watp:this._tpwa,
      cost:this.cost,
      createdby:this.auth.getSavedEmail()
    };

    this.pricingService.registerbundle(newBundle).subscribe(data=>{
      if(data.success){
        alert("Successfully Subscribed");
        location.reload(true);

      }else{
        alert("Already subscribed to a bundle. Please buy credit now.");
      }
    });


  }

  onSubmit(){
    let newBundle = {
      name:this.bundle,
      createdby:this.auth.getSavedEmail()
    }

    this.pricingService.registerbundle(newBundle).subscribe(data=>{
      if(data.success){
        alert("Successfully Subscribed");
        this.getAllBundles();
      }else{
        alert("Not Subscribed");
      }
    });
  }

  getAllBundles(){
    this.pricingService.getallbundles(this.auth.getSavedEmail()).subscribe(data=>{
      this.bundlearr = data.data;
    }); 
  }

  creditarr:any=[];
  getAllCredit(){
    this.pricingService.getallcredits(this.auth.getSavedEmail()).subscribe(data=>{
      this.creditarr=data.data;
    })
  }

  ondelete(id){
    this.pricingService.removebundle(id).subscribe(data=>{
      if(data.success){
        alert("Successfully Deleted");
        this.getAllBundles();
      }else{
        alert("Not Deleted");
      }
    }); 
  }

}
