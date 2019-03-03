import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PricingService } from '../../services/pricing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uacmanagement',
  templateUrl: './uacmanagement.component.html',
  styleUrls: ['./uacmanagement.component.css']
})
export class UacmanagementComponent implements OnInit {
  fullname:String;
  phone:String;
  email:String;
  password:String;
  rights:String[];
  parentemail:String;

  accessrightchilds:any[]= [];

  onchildchangerights:any[] = [];

  staticrights:String[]=['messaging','notification','hybrid','reporting','contacts','tracker','pricing','settings'];

  // rights
  messaging:boolean;
  notification:boolean;
  hybrid:boolean;
  reporting:boolean;
  contacts:boolean;
  tracker:boolean;
  pricing:boolean;
  settings:boolean;

  creditchild:String="";

  searchString:String;

  delegate:boolean=false;
  delegateu:boolean=false;

  smscredit:number=0;
  whatsappcredit:number=0;

  expirybundle:any = null;
  smstp:number = 0;
  watp:number = 0;
  encryption:String = "disable";

  derivedrights:any=[];

  // rights
  currentselectedchild:String;
  checkedarr:String[]=[];
  newcheckedarr:String[]=[];

  historychild:String="";
  // table
  childsarr:any[]=[];

  parentget:Boolean = false;

  constructor(private authService:AuthService,private pricingService:PricingService) { }

  ngOnInit() {

    this.parentemail = this.authService.getSavedEmail();

    this.getChildAccess();
    this.getallchilds();
    this.getparentbalance();
    this.newcheckedarr=[];

    //this.onChildSubmit();
    let user = localStorage.getItem("user");
    let localrights = JSON.parse(user).rights;

    if(localrights.indexOf('pricing') > -1){
      localrights.splice(localrights.indexOf('pricing'),1);
    }

    this.derivedrights = localrights;
    // console.log(this.derivedrights);
  }

  getparentbalance(){
    this.authService.getBalance(this.authService.getSavedEmail()).subscribe(data=>{
      if(data.success){
        
        this.smscredit=data.data.creditsms;
        this.whatsappcredit=data.data.creditwhatsapp;
        this.expirybundle = data.data.expirybundle;
        this.smstp = data.data.smstp;
        this.watp = data.data.watp;
        this.encryption = data.data.encryption;


      }else{
        this.smscredit=0;
        this.whatsappcredit=0;
        this.expirybundle = '2017-12-09T02:08:20.252Z';
        this.smstp = 0;
        this.watp = 0;
        this.encryption = 'disable';

        alert(data.err);
      }
    });
  }

  radiochange(e){
    if(this.delegate){
      this.smscredit = 0;
      this.whatsappcredit = 0 ;
    }else{
      this.getparentbalance();
    }
    
  }

  getChildAccess(){
    let email = {
      val:this.parentemail
    }
    this.authService.getChildAccess(email.val).subscribe(data =>{
      
      //console.log(data.data);

      for(var i=0; i<data.data.length; i++){
        this.accessrightchilds.push({
          value:data.data[i].email,
          name:data.data[i].fullname,
          rights:data.data[i].rights
        });
      }

      // console.log('accessrightschild',this.accessrightchilds);

      
    });
  }

  getallchilds(){
    this.childsarr=[];
    this.authService.getChildAccess(this.parentemail).subscribe(data =>{
      console.log(data.data);
      
      this.childsarr=data.data;
    });
  }


  rightsarr:any=[];
  onChildChange(event){
    this.rightsarr = [];
    this.checkedarr = [];

    this.currentselectedchild = event.target.value;
    this.rightsarr = event.target[event.target.selectedIndex].dataset.payload.trim().split(',');
    this.checkedarr = this.rightsarr;
    

    // here call the function to get the values of rights from main email address
    this.authService.getRights(event.target.value).subscribe(data=>{
      this.onchildchangerights = data.data[0].rights;
      this.delegateu = data.data[0].isdelegate;

      const childs = this.onchildchangerights;
      // console.log(childs);

      if(childs.indexOf("messaging")>=0){
        this.messaging=true;
      }
      if(childs.indexOf("notification")>=0){
        this.notification=true;
      }
      if(childs.indexOf("hybrid")>=0){
        this.hybrid=true;
      }
      if(childs.indexOf("reporting")>=0){
        this.reporting=true;
      }
      if(childs.indexOf("contacts")>=0){
        this.contacts=true;
      }
      if(childs.indexOf("tracker")>=0){
        this.tracker=true;
      }
      if(childs.indexOf("pricing")>=0){
        this.pricing=true;
      }
      if(childs.indexOf("settings")>=0){
        this.settings=true;
      }


    });
  }

  newcheckChange(event,name){
    if(event.target.checked){
      this.newcheckedarr.push(name);
    }
    else
    {
      this.newcheckedarr.splice(this.newcheckedarr.indexOf(name),1);
    }
    // console.log(this.newcheckedarr);
  }

  checkChange(event,name){
    if(event.target.checked){
      this.checkedarr.push(name);
    }
    else
    {
      this.checkedarr.splice(this.checkedarr.indexOf(name),1);
    }
    //console.log(this.checkedarr);
  }

  onchildrightsupdate(){
    let rights = {
      email:this.currentselectedchild,
      rights:this.checkedarr,
      isdelegate:this.delegateu
    }

    //console.log(JSON.parse(rights));
    //console.log(JSON.stringify(rights));
    //console.log(rights);

    this.authService.updateRights(rights).subscribe(data=>{
      if(data.success){
        alert("Rights for this child account were updated.")
        location.reload(true);
      }else{
        alert("Rights for this child account were not updated.")
      }
      //console.log(data.success);
    });

  }


  onChildSubmit(){


    if(this.newcheckedarr.length <= 0){
      alert("Select rights for this user please.")
      return false;
    }

    let local = localStorage.getItem("user")
    //console.log('localparents',JSON.parse(local).parents);
    let parents = JSON.parse(local).parents;
    let type = JSON.parse(local).type;
    parents.push(this.parentemail);
    

    let user = {
      fullname: this.fullname,
      phone: this.phone,
      email: this.email,
      password: this.password,
      rights:this.newcheckedarr,
      isparent:false,
      isdelegate:this.delegate,
      parent:this.parentemail,
      parents:parents,
      type:type,
      creditsms:0,
      creditwhatsapp:0,
      isactivated:true,
      encryption:this.encryption,
      expirybundle:this.expirybundle,
      smstp:this.smstp,
      watp:this.watp
    }

    //  console.log(user);
    

    //Register new user
    this.authService.registerUser(user)
    .subscribe(data=>{
      if(data.success){
        alert("You just registered a child account.");
        this.getallchilds();
        this.getChildAccess();
        console.log("You are now registered. You can now login.");
      }else{
        alert("Something went wrong. Email might already be registered");
        this.getallchilds();
        this.getChildAccess();
        console.log("Something went wrong");
      }
    });


  }

  childdelete(id){
    this.authService.removechild(id).subscribe(data=>{
      if(data.success){
        alert("Successfully Deleted");
        this.getallchilds();
        this.getChildAccess();
      }else{
        alert("Not Deleted");
      }
    }); 
  }

  registercredit(){    
    if(this.creditchild==''){
      alert("Select a child account");
      return ;
    }
    
    let credit = {
      smscredit:this.smscredit==null?0:this.smscredit,
      whatsappcredit:this.whatsappcredit==null?0:this.whatsappcredit,
      from:this.authService.getSavedEmail(),
      to:this.creditchild,
      cost:0,
      payment:true,
      createdby:this.authService.getSavedEmail()
    };

    this.pricingService.registercredit(credit).subscribe(data=>{
      if(data.success){
        alert('Successfully shared!');
      }else{
        alert(data.err);
      }
    });
    
    
  }

  historyarr:any=[];
  historycredit(){
    if(this.historychild==''){
      alert("Select a child account");
      return ;
    }
    this.historyarr = [];

    let query={
      from:this.authService.getSavedEmail(),
      to:this.historychild
    }

    this.pricingService.credithistory(JSON.stringify(query)).subscribe(data=>{
      if(data.success){
        console.log(data.data);
        this.historyarr = data.data;
      }else{
        console.log(data.err);
      }
    });
  }

}
