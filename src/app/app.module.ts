import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StarshipsComponent } from './components/starships/starships.component';
import { NavComponentComponent } from './components/nav-component/nav-component.component';
import { HomeComponent } from './components/home/home.component';
import { StarshipDetailsComponent } from './components/starship-details/starship-details.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ImageErrorHandlerDirective } from './image-error-handler.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatDialogModule} from '@angular/material/dialog';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    StarshipsComponent,
    StarshipDetailsComponent,
    NavComponentComponent,
    HomeComponent,
    ImageErrorHandlerDirective,
    LoginModalComponent,
    SignupComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpHeadersInterceptor,
    multi: true
  },
  AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
