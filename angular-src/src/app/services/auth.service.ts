import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {

  authToken:any;
  user:any;
  baseIP:String="";


  constructor(private http:Http) {

  }

  getallactivatedusers(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(this.baseIP + "users/",{headers})
    .map(res => res.json());
  }

  getusersdump(dump){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(this.baseIP + "users/dump/"+dump,{headers})
    .map(res => res.json());
  }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.post(this.baseIP + "users/register",user,{headers})
    .map(res => res.json());
  }

  loginUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseIP + "users/authenticate",user,{headers})
    .map(res => res.json());
  }

  getBalance(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(this.baseIP + "users/balance/"+email,{headers})
    .map(res => res.json());
  }

  resetpassword(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.put(this.baseIP + "users/resetpassword",email,{headers})
    .map(res => res.json());
  }

  getpending(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(this.baseIP + "users/pending/",{headers})
    .map(res => res.json());
  }

  activateaccount(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.put(this.baseIP + "users/activate",email,{headers})
    .map(res => res.json());
  }

  manipulateAccount(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.put(this.baseIP + "users/manipulate",user,{headers})
    .map(res => res.json());
  }

  getProfilePost(id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.post(this.baseIP + "schools/profile",id,{headers})
    .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get(this.baseIP + "schools/profile",{headers})
    .map(res => res.json());
  }

  // remove new for only immediate parent and other for everything
  getChildAccess(val){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(this.baseIP + "users/childs/new/"+val,{headers})
    .map(res => res.json());
  }

  getRights(email){
    let headers = new Headers();
    console.log(""+ email);
    headers.append('Content-Type','application/json');
    return this.http.get(this.baseIP + "users/rights/"+email,{headers})
    .map(res => res.json());
  }

  updateRights(rights){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put(this.baseIP + "users/rights",rights,{headers})
    .map(res => res.json());
  }

  updateProfile(school){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.put(this.baseIP + "schools/profile",school,{headers})
    .map(res => res.json());
  }

  updateProfilePassword(school){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.put(this.baseIP + "schools/profile/password",school,{headers})
    .map(res => res.json());
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem("id_loggedIn","true");

    this.authToken = token;
    this.user = user;
  }

  onLogout(){
    this.authToken = null;
    this.user = null;

    localStorage.clear();
  }

  loggedIn(){
    return tokenNotExpired();
  }


  getallchilds(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(this.baseIP + "users/rights/"+email,{headers})
    .map(res => res.json());
  }

  
  getallaccounts(email){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(this.baseIP + "users/all/"+email,{headers})
    .map(res => res.json());
  }
  
  

  // getRights(){
  //   let headers = new Headers();
  //   this.loadToken();
  //   headers.append('Authorization',this.authToken);
  //   headers.append('Content-Type','application/json');
  //   return this.http.get(this.baseIP + "users/rights",{headers})
  //   .map(res => res.json());
  // }
  removechild(id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    //since it is an obsservable so we have to map its response
    return this.http.delete(this.baseIP + "users/"+id,{headers})
    .map(res => res.json());
  }

  getSavedEmail(){
    let userstr = localStorage.getItem('user');
    let userobj = JSON.parse(userstr);
    var email = '';
    if(userobj.delegate){
      email = userobj.parent;
    }else{
      email = userobj.email;
    }
    return email;
  }
}
