import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component'; 
import { ProfileWidget } from './home/widgets/profile/profile.widget';
import { Matches } from './home/widgets/matches/matches.widget';
import { Gallery } from './home/widgets/gallery/gallery.widget';
import { LoginComponent } from '/workspaces/genie-dating-app/frontend/src/app/login-screen/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CreateAccountComponent,
    ProfileWidget,
    Matches,
    Gallery 
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
