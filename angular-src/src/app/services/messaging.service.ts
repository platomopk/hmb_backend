import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class MessagingService {

  constructor(private http:Http) {
  }

  registertemplate(template){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.post("http://localhost:3000/messaging/template/register",template,{headers})
    .map(res => res.json());
  }

  getalltemplates(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/template/"+email,{headers})
    .map(res => res.json());
  }

  getallstatictemplates(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/template/static/"+email,{headers})
    .map(res => res.json());
  }

  getalldynamictemplates(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/template/dynamic/"+email,{headers})
    .map(res => res.json());
  }

  removetemplate(id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.delete("http://localhost:3000/messaging/template/"+id,{headers})
    .map(res => res.json());
  }

  //  -------------------------------------------------------------------
  registercampaign(campaign){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.post("http://localhost:3000/messaging/campaigns/register",campaign,{headers})
    .map(res => res.json());
  }

  getallcampaigns(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/campaigns/"+email,{headers})
    .map(res => res.json());
  }

  getallstaticcampaigns(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/campaigns/static/"+email,{headers})
    .map(res => res.json());
  }

  getalldynamiccampaigns(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/campaigns/dynamic/"+email,{headers})
    .map(res => res.json());
  }

  removecampaign(id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.delete("http://localhost:3000/messaging/campaigns/"+id,{headers})
    .map(res => res.json());
  }

  downloadcampaign(path){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/campaigns/download/"+path,{headers})
    .map(res => res.json());
  }

  // ----------------------------------------------------------------------
  registerdigital(digital){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.post("http://localhost:3000/messaging/digital/register",digital,{headers})
    .map(res => res.json());
  }

  registerdigitalstatic(bulk){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.post("http://localhost:3000/messaging/digital/static/register",bulk,{headers})
    .map(res => res.json());
  }

  registerdigitaldynamic(bulk){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.post("http://localhost:3000/messaging/digital/dynamic/register",bulk,{headers})
    .map(res => res.json());
  }

  getalldigital(queryobj){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/digital/"+queryobj,{headers})
    .map(res => res.json());
  }

  getdigitaldump(queryobj){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/digital/dump/"+queryobj,{headers})
    .map(res => res.json());
  }

  removedigital(name){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.delete("http://localhost:3000/messaging/digital/"+name,{headers})
    .map(res => res.json());
  }

  // ---------------------------------------

  

  // -----------------------------------------------------------------------

  registerquick(quick){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.post("http://localhost:3000/messaging/quick/register",quick,{headers})
    .map(res => res.json());
  }

  // getallquick(email){
  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json');
  //   //since it is an obsservable so we have to map its response
  //   return this.http.get("http://localhost:3000/messaging/quick/"+email,{headers})
  //   .map(res => res.json());
  // }

  getallquick(queryobj){
    let headers = new Headers();
    headers.append('Content-Type','application/json;charset=UTF-8');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/quick/"+queryobj,{headers})
    .map(res => res.json());
  }

  getquickdump(queryobj){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/quick/dump/"+queryobj,{headers})
    .map(res => res.json());
  }

  removequick(name){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.delete("http://localhost:3000/messaging/quick/"+name,{headers})
    .map(res => res.json());
  }

  //  --------------------------------------------------------------------

  registerbulk(bulk){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.post("http://localhost:3000/messaging/bulk/register",bulk,{headers})
    .map(res => res.json());
  }

  getallbulk(queryobj){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/bulk/"+queryobj,{headers})
    .map(res => res.json());
  }

  getbulkdump(queryobj){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/bulk/dump/"+queryobj,{headers})
    .map(res => res.json());
  }

  removebulk(name){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.delete("http://localhost:3000/messaging/bulk/"+name,{headers})
    .map(res => res.json());
  }
  
  // -----------------------------------------------------

  registerbulkdynamic(bulk){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.post("http://localhost:3000/messaging/bulk/dynamic/register",bulk,{headers})
    .map(res => res.json());
  }

  // ---------------------------------------------

  registerdrip(drip){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.post("http://localhost:3000/messaging/drip/register",drip,{headers})
    .map(res => res.json());
  }

  getalldrip(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/drip/"+email,{headers})
    .map(res => res.json());
  }

  getdripdump(query){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/drip/dump/"+query,{headers})
    .map(res => res.json());
  }

  removedrip(name){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.delete("http://localhost:3000/messaging/drip/"+name,{headers})
    .map(res => res.json());
  }

  // registergroup(group){
  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json');
  //   //since it is an obsservable so we have to map its response
  //   return this.http.post("http://localhost:3000/contacts/group/register",group,{headers})
  //   .map(res => res.json());
  // }

  // getallgroups(email){
  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json');
  //   //since it is an obsservable so we have to map its response
  //   return this.http.get("http://localhost:3000/contacts/group/"+email,{headers})
  //   .map(res => res.json());
  // }

  // getallcontacts(email){
  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json');
  //   //since it is an obsservable so we have to map its response
  //   return this.http.get("http://localhost:3000/contacts/"+email,{headers})
  //   .map(res => res.json());
  // }

  // removecontact(id){
  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json');
  //   //since it is an obsservable so we have to map its response
  //   return this.http.delete("http://localhost:3000/contacts/"+id,{headers})
  //   .map(res => res.json());
  // }

  // removecontactfromgroup(contact){
  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json');
  //   //since it is an obsservable so we have to map its response
  //   return this.http.delete("http://localhost:3000/contacts/group/contact/"+contact,{headers})
  //   .map(res => res.json());
  // }

  // removegroup(id){
  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json');
  //   //since it is an obsservable so we have to map its response
  //   return this.http.delete("http://localhost:3000/contacts/group/"+id,{headers})
  //   .map(res => res.json());
  // }

  // updategroup(group){
    
  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json');
  //   return this.http.put("http://localhost:3000/contacts/group",group,{headers})
  //   .map(res => res.json());
  // }

  // getgroupwithdetails(email){
  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json');
  //   //since it is an obsservable so we have to map its response
  //   return this.http.get("http://localhost:3000/contacts/group/details/"+email,{headers})
  //   .map(res => res.json());
  // }

  getAccountSummary(creds){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.post("http://localhost:3000/messaging/account/summary",creds,{headers})
    .map(res => res.json());
  }












  getallquickdashboard(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/quick/dashboard/"+email,{headers})
    .map(res => res.json());
  }

  getallbulkdashboard(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/bulk/dashboard/"+email,{headers})
    .map(res => res.json());
  }

  getalldripdashboard(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/drip/dashboard/"+email,{headers})
    .map(res => res.json());
  }

  getalldigitaldashboard(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/digital/dashboard/"+email,{headers})
    .map(res => res.json());
  }

  // --------------- sent
  getallsentquicklimit(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/sent/quick/limit/"+email,{headers})
    .map(res => res.json());
  }


  // ------------ outbox
  getalloutboxquicklimit(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/quick/limit/"+email,{headers})
    .map(res => res.json());
  }

  getalloutboxbulklimit(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/bulk/limit/"+email,{headers})
    .map(res => res.json());
  }

  getalloutboxdigitallimit(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/digital/limit/"+email,{headers})
    .map(res => res.json());
  }


  // ------------------------------ prio quick limit
  getallprioutboxquicklimit(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/pri/quick/limit/"+email,{headers})
    .map(res => res.json());
  }

  // ----- outbox quick count
  getalloutboxquickcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/quick/count/"+email,{headers})
    .map(res => res.json());
  }

  getalloutboxquickjazzcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/quick/jazz/count/"+email,{headers})
    .map(res => res.json());
  }

  getalloutboxquickzongcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/quick/zong/count/"+email,{headers})
    .map(res => res.json());
  }

  getalloutboxquickwaridcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/quick/warid/count/"+email,{headers})
    .map(res => res.json());
  }

  getalloutboxquickufonecount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/quick/ufone/count/"+email,{headers})
    .map(res => res.json());
  }

  getalloutboxquicktelenorcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/quick/telenor/count/"+email,{headers})
    .map(res => res.json());
  }

  // ------------------------------- prio outbox
  getallprioutboxquickcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/pri/quick/count/"+email,{headers})
    .map(res => res.json());
  }

  // -----------------------------------


  getalloutboxbulkjazzcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/bulk/jazz/count/"+email,{headers})
    .map(res => res.json());
  }

  getalloutboxbulkzongcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/bulk/zong/count/"+email,{headers})
    .map(res => res.json());
  }

  getalloutboxbulkwaridcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/bulk/warid/count/"+email,{headers})
    .map(res => res.json());
  }

  getalloutboxbulkufonecount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/bulk/ufone/count/"+email,{headers})
    .map(res => res.json());
  }

  getalloutboxbulktelenorcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/bulk/telenor/count/"+email,{headers})
    .map(res => res.json());
  }


  // prioutbox telco segregate
  getallprioutboxquickjazzcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/pri/quick/jazz/count/"+email,{headers})
    .map(res => res.json());
  }

  getallprioutboxquickzongcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/pri/quick/zong/count/"+email,{headers})
    .map(res => res.json());
  }

  getallprioutboxquickwaridcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/pri/quick/warid/count/"+email,{headers})
    .map(res => res.json());
  }

  getallprioutboxquickufonecount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/pri/quick/ufone/count/"+email,{headers})
    .map(res => res.json());
  }

  getallprioutboxquicktelenorcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/pri/quick/telenor/count/"+email,{headers})
    .map(res => res.json());
  }

  
  getallprioutboxbulkjazzcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/pri/bulk/jazz/count/"+email,{headers})
    .map(res => res.json());
  }

  getallprioutboxbulkzongcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/pri/bulk/zong/count/"+email,{headers})
    .map(res => res.json());
  }

  getallprioutboxbulkwaridcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/pri/bulk/warid/count/"+email,{headers})
    .map(res => res.json());
  }

  getallprioutboxbulkufonecount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/pri/bulk/ufone/count/"+email,{headers})
    .map(res => res.json());
  }

  getallprioutboxbulktelenorcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/pri/bulk/telenor/count/"+email,{headers})
    .map(res => res.json());
  }





  // -----------------

  getalloutboxbulkcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/bulk/count/"+email,{headers})
    .map(res => res.json());
  }

  getalloutboxdigitalcount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/messaging/outbox/digital/count/"+email,{headers})
    .map(res => res.json());
  }

    // ----- 
    getalltotalquickcount(email){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      //since it is an obsservable so we have to map its response
      return this.http.get("http://localhost:3000/messaging/total/quick/count/"+email,{headers})
      .map(res => res.json());
    }
  
    getalltotalbulkcount(email){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      //since it is an obsservable so we have to map its response
      return this.http.get("http://localhost:3000/messaging/total/bulk/count/"+email,{headers})
      .map(res => res.json());
    }
  
    getalltotaldigitalcount(email){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      //since it is an obsservable so we have to map its response
      return this.http.get("http://localhost:3000/messaging/total/digital/count/"+email,{headers})
      .map(res => res.json());
    }

    getalltotaldripcount(email){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      //since it is an obsservable so we have to map its response
      return this.http.get("http://localhost:3000/messaging/total/drip/count/"+email,{headers})
      .map(res => res.json());
    }


}
