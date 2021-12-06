import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

//prova de pull request

export class SignupComponent implements OnInit {

  userForm= new FormGroup({
    firstName: new FormControl(''),
    lastName:new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  
  });

  name=this.userForm.value.firstName;
  lname=this.userForm.value.lastName;
  email=this.userForm.value.email;
  password=this.userForm.value.password;
  
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
   
  }
  createUser(){
    this.auth.createUser(
      this.userForm.value.email,
      this.userForm.value.password,
      this.userForm.value.firstName,
      this.userForm.value.lastName
    );
    console.log(this.userForm.value);
  }
  

}
