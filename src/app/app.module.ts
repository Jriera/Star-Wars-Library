import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarshipsComponent } from './components/starships/starships.component';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import { StarshipDetailsComponent } from './components/starship-details/starship-details.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NavComponentComponent } from './components/nav-component/nav-component.component';
import { HomeComponent } from './components/home/home.component';
import { ImageErrorHandlerDirective } from './image-error-handler.directive';

@NgModule({
  declarations: [
    AppComponent,
    StarshipsComponent,
    StarshipDetailsComponent,
    NavComponentComponent,
    HomeComponent,
    ImageErrorHandlerDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpHeadersInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
