import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HomeService } from '/workspaces/genie-dating-app/frontend/src/app/home/home.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'profile',
    templateUrl: './profile.widget.html',
    styleUrls: ['./profile.widget.css'],
    providers: [HomeService],
    imports: [MatCardModule, HttpClientModule],
    standalone: true
  })
  export class ProfileWidget {
    public loggedProfile = HomeService.loggedInUser;

    constructor(private homeService: HomeService){}
  }