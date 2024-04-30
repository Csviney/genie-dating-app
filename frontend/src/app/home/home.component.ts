import { Component, OnInit } from '@angular/core';
import { Matches } from './widgets/matches/matches.widget';
import { Gallery } from './widgets/gallery/gallery.widget';
import { ProfileWidget } from './widgets/profile/profile.widget';
import {MatCardModule} from '@angular/material/card';
import { HomeService } from '../home/home.service';
import { HttpClientModule } from '@angular/common/http';
import { Profile, Match } from '../models.module';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [MatCardModule, HttpClientModule, ProfileWidget, Gallery, Matches, MatButtonModule],
  providers: [HomeService],
  standalone: true
})
export class HomeComponent implements OnInit{
  allProfiles: Profile[] = []
  loggedinProfile: Profile;

  constructor(private homeService: HomeService,
    private router: Router
  ){
    this.loggedinProfile = HomeService.loggedInUser;
  }

  ngOnInit(): void {
    //Load all profiles into home page on load
    // this.homeService.getProfileById2(this.homeService.getProfileId()).subscribe((profile) => {
    //   console.log('GETTING PROFILE FROM SESSION HOME PAGE', profile)
    //   this.loggedinProfile = profile;
    // })
    
    // this.homeService.getAllProfiles().subscribe((profiles: Profile[]) => {
    //   this.allProfiles = profiles;
    //   console.log(this.allProfiles);
    // });
  }

  onClick() {
    this.router.navigateByUrl('/').then(() => {
      // Force a reload of the page
      window.location.reload();
    });
  }
}
