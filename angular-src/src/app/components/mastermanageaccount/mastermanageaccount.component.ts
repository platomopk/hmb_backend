import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PricingService } from '../../services/pricing.service';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-mastermanageaccount',
  templateUrl: './mastermanageaccount.component.html',
  styleUrls: ['./mastermanageaccount.component.css']
})
export class MastermanageaccountComponent implements OnInit {

  email: String = "";
  promocredit: number = 0;
  userobj: any = {};
  enable: boolean = false;


  constructor(private auth: AuthService, private pricing: PricingService, private messaging: MessagingService) { }

  ngOnInit() {
    this.getallaccounts()
  }

  accountsarr: any = []
  getallaccounts() {
    this.auth.getallactivatedusers().subscribe(data => {
      if (data.success) {
        this.accountsarr = data.data;
      }
    });
  }

  search() {
    if (this.email == "") {
      alert("Enter Email");
      return false;
    }
    this.auth.getBalance(this.email.trim()).subscribe(data => {
      if (data.success) {
        this.userobj = data.data;
        this.enable = true;
        this.getchilds(this.userobj.email);
      } else {
        alert(data.err);
        this.enable = false;
      }
    })
  }

  clear() {
    this.email = "";
    this.enable = false;
  }

  suspend(email) {
    let obj = {
      email: email,
      issuspended: true
    }

    this.auth.manipulateAccount(obj).subscribe(data => {
      this.enable = false;
      this.search()
    })
  }

  allow(email) {
    let obj = {
      email: email,
      issuspended: false
    }

    this.auth.manipulateAccount(obj).subscribe(data => {
      this.enable = false;
      this.search()
    })
  }

  resetpassword(e) {
    let email = {
      email: e
    }
    this.auth.resetpassword(email).subscribe(data => {
      if (data.success) {
        alert('Password reset complete.');
      } else {
        alert(data.err);
      }
    })
  }

  quick(e) {
    this.messaging.getalltotalquickcount(e).subscribe(data => {
      if (data.success) {
        alert(data.count + ' messages were sent');
      }
    })
  }

  bulk(e) {
    this.messaging.getalltotalbulkcount(e).subscribe(data => {
      if (data.success) {
        alert(data.count + ' messages were sent');
      }
    })
  }

  whatsapp(e) {
    this.messaging.getalltotaldigitalcount(e).subscribe(data => {
      if (data.success) {
        alert(data.count + ' messages were sent');
      }
    })
  }

  childsarr: any = []
  getchilds(email) {
    this.auth.getChildAccess(email).subscribe(data => {
      if (data.success) {
        this.childsarr = data.data
      }
    })
  }

  week1(email,expiry) {
      this.pricing.extendexpirypromo({email:email,expiry:expiry}).subscribe(data=>{
        if(data.success){
          alert('Successfully added 1 week to the expiry.')
        }else{
          alert(data.err)
        }
      })
  }
  psms(email) {
    let credit = {
      smscredit:this.promocredit==null?0:this.promocredit,
      whatsappcredit:0,
      from:'sa@mangotree.com',
      to:email,
      cost:0,
      payment:true,
      createdby:email
    };

    this.pricing.registercredit(credit).subscribe(data=>{
      if(data.success){
        alert('Successfully Added Promo Credit!');
      }else{
        alert(data.err);
      }
    });
  }


  pwhatsapp(email) {
    let credit = {
      smscredit:0,
      whatsappcredit:this.promocredit==null?0:this.promocredit,
      from:'sa@mangotree.com',
      to:email,
      cost:0,
      payment:true,
      createdby:email
    };

    this.pricing.registercredit(credit).subscribe(data=>{
      if(data.success){
        alert('Successfully Added Promo Credit!');
      }else{
        alert(data.err);
      }
    });
  }
}
