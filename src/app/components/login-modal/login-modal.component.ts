import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  userLogin=new FormGroup({
    emailForm:new FormControl(''),
    passwordForm:new FormControl('')
  })
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    this.auth.authenticate(this.userLogin.value.emailForm,this.userLogin.value.passwordForm)
    this.router.navigate(['/starships'])

  }

}
