import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PricingService {


  constructor(private http:Http) { }

  registerbundle(bundle){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.post("http://localhost:3000/bundles/register",bundle,{headers})
    .map(res => res.json());
  }

  extendexpirypromo(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.put("http://localhost:3000/bundles/extendexpirypromo",email,{headers})
    .map(res => res.json());
  }

  registercredit(credit){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.post("http://localhost:3000/bundles/credit/register",credit,{headers})
    .map(res => res.json());
  }

  credithistory(query){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/bundles/credit/history/"+query,{headers})
    .map(res => res.json());
  }

  getallbundles(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/bundles/"+email,{headers})
    .map(res => res.json());
  }

  getallcredits(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/bundles/credit/"+email,{headers})
    .map(res => res.json());
  }

  getpendingconfigs(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/bundles/all/pending/",{headers})
    .map(res => res.json());
  }

  receivebundlepayment(bundleid){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.put("http://localhost:3000/bundles/receive",bundleid,{headers})
    .map(res => res.json());
  }




  getpendingcredits(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/bundles/credit/all/pending/",{headers})
    .map(res => res.json());
  }

  receivecreditpayment(creditid){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.put("http://localhost:3000/bundles/credit/receive",creditid,{headers})
    .map(res => res.json());
  }


  


  removebundle(id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.delete("http://localhost:3000/bundles/"+id,{headers})
    .map(res => res.json());
  }



  getconfigurationdump(dump){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/bundles/dump/"+dump,{headers})
    .map(res => res.json());
  }

  getcreditdump(dump){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/bundles/credit/dump/"+dump,{headers})
    .map(res => res.json());
  }


}
