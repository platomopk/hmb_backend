import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SchoolService {

  baseIP:String="";

  constructor(private http:Http) { }

  registerSchool(school){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.post(this.baseIP + "schools/register",school,{headers})
    .map(res => res.json());
  }

  loginSchool(school){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseIP + "schools/authenticate",school,{headers})
    .map(res => res.json());
  }

  getchildren(school){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseIP + "schools/children/verify",school,{headers})
    .map(res => res.json());
  }

  getdrivers(school){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseIP + "schools/drivers/verify",school,{headers})
    .map(res => res.json());
  }

  getverifieddrivers(school){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseIP + "schools/drivers/getall",school,{headers})
    .map(res => res.json());
  }

  trackdrivers(school){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseIP + "schools/drivers/track",school,{headers})
    .map(res => res.json());
  }

  markverify(child){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseIP + "schools/children/markverify",child,{headers})
    .map(res => res.json());
  }

  markverifydriver(driver){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseIP + "schools/drivers/markverify",driver,{headers})
    .map(res => res.json());
  }

  searchchildbyname(name){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseIP + "schools/children/get/name",name,{headers})
    .map(res => res.json());
  }

  searchchildbyrollnumber(rollnumber){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseIP + "schools/children/get/rollnumber",rollnumber,{headers})
    .map(res => res.json());
  }

  searchdriverbycnic(cnic){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseIP + "schools/drivers/get/cnic",cnic,{headers})
    .map(res => res.json());
  }

  searchdriverbyregid(regid){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseIP + "schools/drivers/get/regid",regid,{headers})
    .map(res => res.json());
  }


  getdriverlessstudents(child){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseIP + "schools/children/getdriverless",child,{headers})
    .map(res => res.json());
  }

  getavailabledrivers(driver){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseIP + "schools/drivers/getavailabledrivers",driver,{headers})
    .map(res => res.json());
  }

  placechild(obj){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseIP + "schools/placechild",obj,{headers})
    .map(res => res.json());
  }



}
