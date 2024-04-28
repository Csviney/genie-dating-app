import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HomeService } from '../../home.service';
import { HttpClientModule } from '@angular/common/http';
import { Profile, Match } from '../../../models.module';



@Component({
    selector: 'matches',
    templateUrl: './matches.widget.html',
    styleUrls: ['./matches.widget.css'],
    imports: [MatCardModule, HttpClientModule, CommonModule],
    providers: [HomeService],
    standalone: true
  })
  export class Matches implements OnInit {
    loggedinProfile: Profile;
    matches: Match[] = [];
  
    constructor(private homeService: HomeService) {
      this.loggedinProfile = HomeService.loggedInUser as Profile;
    }
  
    ngOnInit(): void {
      this.homeService.getMatchesofProfile(this.loggedinProfile.id).subscribe((matches) => {
        this.matches = matches;
        console.log('logged ID,', this.loggedinProfile.id)
        console.log('matches in observable,', matches)
      })
    }
  }