import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';
@Component({
  selector: 'app-nav-component',
  templateUrl: './nav-component.component.html',
  styleUrls: ['./nav-component.component.scss']
})
export class NavComponentComponent implements OnInit {

  constructor(private dialog:MatDialog) { }
    
  ngOnInit(): void {
  }
  
  openLoginModal(){
    this.dialog.open(LoginModalComponent,{
      backdropClass:'backdrop'
    });
  }

  openSingupModal(){
    this.dialog.open(SignupComponent,{
      backdropClass:'backdrop'
    });
  }
}

