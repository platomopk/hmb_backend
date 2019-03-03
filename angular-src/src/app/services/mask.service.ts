import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MaskService {

  constructor(private http:Http) { }

  registermask(mask){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.post("http://localhost:3000/masks/register",mask,{headers})
    .map(res => res.json());
  }

  getallmask(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/masks/"+email,{headers})
    .map(res => res.json());
  }

  getpendingmasks(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/masks/pending",{headers})
    .map(res => res.json());
  }

  activatemask(mask){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.put("http://localhost:3000/masks/allow",mask,{headers})
    .map(res => res.json());
  }

  getmaskbyid(id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/masks/id/"+id,{headers})
    .map(res => res.json());
  }

  getactivatedmasks(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.get("http://localhost:3000/masks/activated/"+email,{headers})
    .map(res => res.json());
  }

  removemask(id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.delete("http://localhost:3000/masks/"+id,{headers})
    .map(res => res.json());
  }


}
