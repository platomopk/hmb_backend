import { Component, OnInit } from '@angular/core';
import { PricingService } from '../../services/pricing.service';
import { MessagingService } from '../../services/messaging.service';
import { AuthService } from '../../services/auth.service';
import { CsvService } from "angular2-json2csv";

@Component({
  selector: 'app-masterreports',
  templateUrl: './masterreports.component.html',
  styleUrls: ['./masterreports.component.css'],
  providers: [CsvService]
})
export class MasterreportsComponent implements OnInit {

  d: any = new Date();
  datefrom: String =
  this.d.getFullYear() +
  "-" +
  ("0" + (this.d.getMonth() + 1)).slice(-2) +
  "-" +
  ("0" + this.d.getDate()).slice(-2);
  dateto: String =
  this.d.getFullYear() +
  "-" +
  ("0" + (this.d.getMonth() + 1)).slice(-2) +
  "-" +
  ("0" + this.d.getDate()).slice(-2);


  constructor(private auth:AuthService, private pricingService: PricingService, private messagingService:MessagingService,private _csvService: CsvService) { }

  ngOnInit() {
  }

  config() {
    let query = {
      dateto: this.dateto,
      datefrom: this.datefrom
    }
    this.pricingService.getconfigurationdump(JSON.stringify(query)).subscribe(data => {
      if (data.success) {
        console.log(data.data);
        this._csvService.download(data.data,'configdump');
      } else {
        console.log(data.error);
      }
    })
  }

  credit() {
    let query = {
      dateto: this.dateto,
      datefrom: this.datefrom
    }
    this.pricingService.getcreditdump(JSON.stringify(query)).subscribe(data => {
      if (data.success) {
        console.log(data.data);
        this._csvService.download(data.data,'creditdump');
      } else {
        console.log(data.error);
      }
    })
  }

  quick(){
    let query = {
      dateto: this.dateto,
      datefrom: this.datefrom
    }
    this.messagingService.getquickdump(JSON.stringify(query)).subscribe(data => {
      if (data.success) {
        console.log(data.data);
        this._csvService.download(data.data,'quickdump');
      } else {
        console.log(data.error);
      }
    })
  }

  bulk(){
    let query = {
      dateto: this.dateto,
      datefrom: this.datefrom
    }
    this.messagingService.getbulkdump(JSON.stringify(query)).subscribe(data => {
      if (data.success) {
        console.log(data.data);
        this._csvService.download(data.data,'bulkdump');
      } else {
        console.log(data.error);
      }
    })
  }

  digital(){
    let query = {
      dateto: this.dateto,
      datefrom: this.datefrom
    }
    this.messagingService.getdigitaldump(JSON.stringify(query)).subscribe(data => {
      if (data.success) {
        console.log(data.data);
        this._csvService.download(data.data,'digitaldump');
      } else {
        console.log(data.error);
      }
    })
  }

  drip(){
    let query = {
      dateto: this.dateto,
      datefrom: this.datefrom
    }
    this.messagingService.getdripdump(JSON.stringify(query)).subscribe(data => {
      if (data.success) {
        console.log(data.data);
        this._csvService.download(data.data,'dripdump');
      } else {
        console.log(data.error);
      }
    })
  }

  accounts(){
    let query = {
      dateto: this.dateto,
      datefrom: this.datefrom
    }
    this.auth.getusersdump(JSON.stringify(query)).subscribe(data => {
      if (data.success) {
        console.log(data.data);
        this._csvService.download(data.data,'accountsdump');
      } else {
        console.log(data.error);
      }
    })
  }

}
