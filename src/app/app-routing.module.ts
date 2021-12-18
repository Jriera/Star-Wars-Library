import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarshipsComponent } from './components/starships/starships.component';
import { StarshipDetailsComponent } from './components/starship-details/starship-details.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'starships',component: StarshipsComponent, canActivate: [AuthGuard] },
  { path: 'starship/:id',component: StarshipDetailsComponent, canActivate: [AuthGuard]},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
