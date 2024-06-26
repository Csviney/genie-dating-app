import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login-screen/login.component';
import { CreateAccountComponent } from './create-account/create-account.component'

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'create', component: CreateAccountComponent}
];
