import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { MessagingService } from '../../services/messaging.service';
import { CsvService } from "angular2-json2csv";
import { resolve } from '../../../../node_modules/@types/q';
import {AES, enc} from 'crypto-js'

@Component({
  selector: 'app-leareporting',
  templateUrl: './leareporting.component.html',
  styleUrls: ['./leareporting.component.css'],
  providers: [CsvService]
})
export class LeareportingComponent implements OnInit {
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy HH:mm:ss',
    defaultOpen: false,
    closeOnSelect: true
  }

  notfound:boolean = false;
  spinner:boolean = false;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Timeline'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


  d: any = new Date();

  constructor(private auth: AuthService, private msgService: MessagingService, private _csvService: CsvService) { }

  operation: String;
  operationname: String;
  account:String="";

  downloadable: any[] = [];



  datefrom: String = this.d.getFullYear() + "-" + ('0' + (this.d.getMonth() + 1)).slice(-2) + "-" + ('0' + (this.d.getDate())).slice(-2);
  dateto: String = this.d.getFullYear() + "-" + ('0' + (this.d.getMonth() + 1)).slice(-2) + "-" + ('0' + (this.d.getDate())).slice(-2);


  localemail:String="";

  ngOnInit() {
    this.getallaccounts();
      this.localemail = this.auth.getSavedEmail();
  }


  opchange(ev) {
    this.operation = ev.target.value;
    console.log(this.operation);

    if (this.operation == "quick") {
      //this.getallquick();
    } else if (this.operation == "bulk") {
      //this.getallbulk();
    } else if (this.operation == "drip") {
      //this.getalldrip();
    }
  }

  acchange(ev) {
   this.account = AES.decrypt(ev.target.value.trim(), this.localemail.trim().toString()).toString(enc.Utf8)
    //this.account = ev.target.value;
    console.log(this.account);
  }

  accountsArr:any=[];
  getallaccounts(){
    this.auth.getallaccounts(this.auth.getSavedEmail()).
    subscribe(data=>{
      if(data.success){
        // data.data.forEach(element => {
        //   element.email = AES.decrypt(element.email.trim(), this.localemail.trim().toString()).toString(enc.Utf8)
        // });
        this.accountsArr = data.data;
      }
    });
  }

  opnamechangequick(ev) {
    this.operationname = ev.target.value;
  }

  opnamechangeother(ev) {
    this.operationname = ev.target.value;
  }

  _MS_PER_DAY: any = 1000 * 60 * 60 * 24;
  // a and b are javascript Date objects
  dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / this._MS_PER_DAY);
  }

  ops: any[] = [];


  report() {

    if(this.account == ""){
        alert("Select account please.")
        return false;
    }

    this.notfound = false;
    

    this.barChartData = [];
    this.downloadable = [];
    this.ops = [];

    if (this.operation == "quick") {


      this.barChartLabels = ['Total','Jazz','Zong','Warid','Ufone','Telenor'];



      this.spinner = true;

      //this.ops = [];
      let queryobj = {
        email: this.account,
        datefrom: this.datefrom,
        dateto: this.dateto
      }
      this.msgService.getallquick(JSON.stringify(queryobj)).subscribe(data => {

        //console.log(data);
        var feed = {
          joutbox : 0,
          jsent: 0,
          jsuccessful: 0,
          zoutbox : 0,
          zsent: 0,
          zsuccessful: 0,
          woutbox : 0,
          wsent: 0,
          wsuccessful: 0,
          uoutbox : 0,
          usent: 0,
          usuccessful: 0,
          toutbox : 0,
          tsent: 0,
          tsuccessful: 0
        }

        if (data.data.length > 0) {

          data.data.forEach(element => {
            if(this.localemail != ''){
              
              if(element.telco == "jazz"){
                feed.jsent++;
                if(element.sentid == "0"){
                  feed.joutbox++;
                }else{
                  feed.jsuccessful++;
                }
              }else if(element.telco == "zong"){
                feed.zsent++;
                if(element.sentid == "0"){
                  feed.zoutbox++;
                }else{
                  feed.zsuccessful++;
                }
              }else if(element.telco == "warid"){
                feed.wsent++;
                if(element.sentid == "0"){
                  feed.woutbox++;
                }else{
                  feed.wsuccessful++;
                }
              }else if(element.telco == "ufone"){
                feed.usent++;
                if(element.sentid == "0"){
                  feed.uoutbox++;
                }else{
                  feed.usuccessful++;
                }
              }else if(element.telco == "telenor"){
                feed.tsent++;
                if(element.sentid == "0"){
                  feed.toutbox++;
                }else{
                  feed.tsuccessful++;
                }
              }
              element.msg = element.encrypted == true? AES.decrypt(element.msg, this.account.toString()).toString(enc.Utf8):element.msg
            }

            delete element.mnp;
            delete element.intended;
            delete element.priority;
            delete element._id;
            delete element.name;
            delete element.language;
            delete element.masking;
            delete element.msgchars;
            delete element.noofmsgs;
            delete element.preference;
            delete element.sentlength;
            delete element.updatedAt;
            delete element.createdby;
          });

          //console.log(data.data);

          this.ops = data.data;

          //console.log(feed);
          

          var countoutbox = 0;
          var countsent = this.ops.length;
          var successful = 0;

          this.ops.forEach(element => {
            if (element.sentid == "0") {
              countoutbox++;
            } else {
              successful++;
            }
          });

          this.barChartData.push({ data: [countsent,feed.jsent,feed.zsent,feed.wsent,feed.usent,feed.tsent], label: 'Sent' });
          // this.barChartData.push({ data: [countoutbox,feed.joutbox,feed.zoutbox,feed.woutbox,feed.uoutbox,feed.toutbox], label: 'Outbox' });
          // this.barChartData.push({ data: [successful,feed.jsuccessful,feed.zsuccessful,feed.wsuccessful,feed.usuccessful,feed.tsuccessful], label: 'Successful' });

          this.downloadable = this.ops;

          //this.spinner=false;
          //console.log(this.ops);
        } else {
          console.log('No Quick Messages');
          this.notfound =true;
        }
        this.spinner = false;
      });


    } else if (this.operation == "bulk") {

      this.barChartLabels = ['Total','Jazz','Zong','Warid','Ufone','Telenor'];
      this.spinner = true;

      let queryobj = {
        email: this.account,
        datefrom: this.datefrom,
        dateto: this.dateto
      }
      this.msgService.getallbulk(JSON.stringify(queryobj)).subscribe(data => {
        console.log(data);
        var feed = {
          joutbox : 0,
          jsent: 0,
          jsuccessful: 0,
          zoutbox : 0,
          zsent: 0,
          zsuccessful: 0,
          woutbox : 0,
          wsent: 0,
          wsuccessful: 0,
          uoutbox : 0,
          usent: 0,
          usuccessful: 0,
          toutbox : 0,
          tsent: 0,
          tsuccessful: 0
        }

        if (data.data.length > 0) {
          //console.log(data.data);

          data.data.forEach(element => {
            if(this.localemail != ''){
              
              if(element.telco == "jazz"){
                feed.jsent++;
                if(element.sentid == "0"){
                  feed.joutbox++;
                }else{
                  feed.jsuccessful++;
                }
              }else if(element.telco == "zong"){
                feed.zsent++;
                if(element.sentid == "0"){
                  feed.zoutbox++;
                }else{
                  feed.zsuccessful++;
                }
              }else if(element.telco == "warid"){
                feed.wsent++;
                if(element.sentid == "0"){
                  feed.woutbox++;
                }else{
                  feed.wsuccessful++;
                }
              }else if(element.telco == "ufone"){
                feed.usent++;
                if(element.sentid == "0"){
                  feed.uoutbox++;
                }else{
                  feed.usuccessful++;
                }
              }else if(element.telco == "telenor"){
                feed.tsent++;
                if(element.sentid == "0"){
                  feed.toutbox++;
                }else{
                  feed.tsuccessful++;
                }
              }
              element.msg = element.encrypted == true? AES.decrypt(element.msg, this.account.toString()).toString(enc.Utf8):element.msg
            }

            delete element.mnp;
            delete element.intended;
            delete element.priority;
            delete element._id;
            delete element.name;
            delete element.language;
            delete element.type;
            delete element.campaign;
            delete element.path;
            delete element.masking;
            delete element.createdby;
            delete element.sentlength;

          });

          //console.log(feed);
          

          this.ops = data.data;

          var countoutbox = 0;
          var countsent = this.ops.length;
          var successful = 0;

          this.ops.forEach(element => {
            if (element.sentid == "0") {
              countoutbox++;
            } else {
              successful++;
            }
          });

          this.barChartData.push({ data: [countsent,feed.jsent,feed.zsent,feed.wsent,feed.usent,feed.tsent], label: 'Sent' });
          // this.barChartData.push({ data: [countoutbox,feed.joutbox,feed.zoutbox,feed.woutbox,feed.uoutbox,feed.toutbox], label: 'Outbox' });
          // this.barChartData.push({ data: [successful,feed.jsuccessful,feed.zsuccessful,feed.wsuccessful,feed.usuccessful,feed.tsuccessful], label: 'Successful' });


          this.downloadable = this.ops;
          //this.spinner = false;
          //console.log(this.ops);
        } else {
          console.log('No Bulk Messages');
          this.notfound = true;
        }
        this.spinner = false;
      })
      // var bulkarr = [];
      // this.barChartData = [];
      // this.ops.forEach(element => {

      //   var quickdate = new Date(element.created.toString());
      //   var differencefrom = this.dateDiffInDays(datefrom, quickdate);
      //   var differenceto = this.dateDiffInDays(quickdate, dateto);
      //   // console.log('quickdate', quickdate);
      //   // console.log('from', datefrom);
      //   // console.log('to', dateto);
      //   if (differencefrom >= 0 && differenceto >= 0) {
      //     bulkarr.push(element);
      //   }

      // });

      // this.barChartData.push({ data: [bulkarr.length], label: 'Sent' });
      // this.barChartData.push({ data: [0], label: 'Outbox' });
      // this.barChartData.push({ data: [bulkarr.length], label: 'Successful' });

      // this.downloadable = bulkarr;






    } else if (this.operation == "drip") {
      this.barChartLabels = ['Timeline'];
      this.spinner = true;

      this.msgService.getalldrip(this.auth.getSavedEmail()).subscribe(data => {
        if (data.data.length > 0) {


          this.ops = data.data;
          console.log(this.ops);
          // console.log(this.dripArr.length);

          var from = new Date(this.datefrom.toString());
          var to = new Date(this.dateto.toString());

          //console.log(this.dateDiffInDays(from, new Date(this.dateto.toString())),to,new Date(this.datefrom.toString()));


          var driparr = [];
          this.barChartData = [];
          this.ops.forEach(element => {

            var quickdate = new Date(element.created.toString());
            var differencefrom = this.dateDiffInDays(from, quickdate);
            var differenceto = this.dateDiffInDays(quickdate, to);

            console.log('quickdate', quickdate);
            console.log(differencefrom, differenceto);


            // console.log('from', datefrom);
            // console.log('to', dateto);
            if (differencefrom >= 0 && differenceto >= 0) {
              driparr.push(element);
            }

          });

          this.barChartData.push({ data: [driparr.length], label: 'Sent' });
          this.barChartData.push({ data: [0], label: 'Outbox' });
          this.barChartData.push({ data: [driparr.length], label: 'Submitted to the system' });

          this.downloadable = driparr;


          //this.spinner=false;

        } else {
          console.log('No Bulk Messages');
          this.notfound = true;
        }
        this.spinner = false;
      });













    }

  }

  download() {
    this._csvService.download(this.downloadable, this.operation.toString());
  }



  getallquick() {
    //this.ops = [];
    let queryobj = {
      email: this.auth.getSavedEmail(),
      datefrom: this.datefrom,
      dateto: this.dateto
    }
    this.msgService.getallquick(JSON.stringify(queryobj)).subscribe(data => {

      console.log(data);

      if (data.data.length > 0) {
        //console.log(data.data);
        this.ops = data.data;
        //console.log(this.ops);
      } else {
        console.log('No Quick Messages');
      }
    });
  }





  getallbulk() {
    this.msgService.getallbulk(this.auth.getSavedEmail()).subscribe(data => {
      if (data.data.length > 0) {
        // console.log(data.data);


        this.ops = data.data;
        //console.log(this.ops);


      } else {
        console.log('No Bulk Messages');
      }
    });
  }

  getalldrip() {
    this.msgService.getalldrip(this.auth.getSavedEmail()).subscribe(data => {
      if (data.data.length > 0) {


        this.ops = data.data;
        console.log(this.ops);
        // console.log(this.dripArr.length);

      } else {
        console.log('No Bulk Messages');
      }
    });
  }





}
