import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  createUser(email: string, password: string, name: string,lname:string) {
    // Here you can create a new user
    const user:User = {
      name: name,
      lname:lname,
      password: password,
      email: email
    }
    localStorage.setItem('user', JSON.stringify(user));
  }

  authenticate(email: string, password: string) {
    
    const user:User=JSON.parse(localStorage.getItem('user')||'{}');
    user.email===email && user.password===password ? true : false;
    

  }



}
