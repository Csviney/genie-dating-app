import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '/workspaces/genie-dating-app/frontend/src/app/app.routing.module.ts'; // Ensure this is the correct path
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component'; // Ensure HomeComponent is imported if it's declared here

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent // Declare HomeComponent if it's part of this module
  ],
  imports: [
    BrowserModule,
    AppRoutingModule // Include AppRoutingModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
