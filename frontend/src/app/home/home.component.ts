import { Component, OnInit } from '@angular/core';
import { Matches } from './widgets/matches/matches.widget';
import { Gallery } from './widgets/gallery/gallery.widget';
import { Profile } from './widgets/profile/profile.widget';
import {MatCardModule} from '@angular/material/card';
import { HomeService } from '../home/home.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [MatCardModule, HttpClientModule],
  providers: [HomeService],
  standalone: true
})
export class HomeComponent implements OnInit{
  allProfiles: Profile[] = []

  constructor(private homeService: HomeService){}

  ngOnInit(): void {
    //Load all profiles into home page on load
    //When creating an account then getting redirected to home screen, 
    //it doesn't have your account in db until you refresh website
    this.homeService.getAllProfiles().subscribe((profiles: Profile[]) => {
      this.allProfiles = profiles;
      console.log(this.allProfiles);
    });
  }
}
