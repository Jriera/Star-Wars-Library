import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn:boolean=false;
  constructor() { }
  autoLogout(){
    this.isLoggedIn=false;
    localStorage.setItem('isLoggedIn', this.isLoggedIn.toString());
  }
  createUser(email: string, password: string, name: string,lname:string) {
    // Here you can create a new user
    const user:User = {
      name: name,
      lname:lname,
      password: password,
      email: email
    }
    this.isLoggedIn=true;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isLoggedIn',  this.isLoggedIn.toString());
    setTimeout(() => {
      this.autoLogout();
      console.log('autoLogout');
    } , 10000);
  }

  authenticate(email: string, password: string) {
    
    const user:User=JSON.parse(localStorage.getItem('user')||'{}');
    user.email===email && user.password===password ? this.isLoggedIn=true : this.isLoggedIn=false;
    localStorage.setItem('isLoggedIn', this.isLoggedIn.toString());
    return this.isLoggedIn;
    

  }



}
