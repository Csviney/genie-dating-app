import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HomeService } from '../../home.service';
import { Profile } from '../../../models.module';

@Component({
    selector: 'gallery',
    templateUrl: './gallery.widget.html',
    styleUrls: ['./gallery.widget.css'],
    imports: [MatCardModule, CommonModule],
    providers: [HomeService],
    standalone: true
  })
  export class Gallery implements OnInit {
    galleryProfiles: Profile[] = []
    loggedinProfile: Profile;
    
    constructor(private homeService: HomeService){
      this.loggedinProfile = HomeService.loggedInUser;
    }
    ngOnInit(): void {
      //Load all profiles into home page on load
      this.homeService.getAllProfiles().subscribe((profiles: Profile[]) => {
        for (let p of profiles) {
          if (p.username != this.loggedinProfile.username
              && this.loggedinProfile.preferences?.includes(p.gender) 
              // check if not in matches as well
          ) {
            this.galleryProfiles.push(p);
          }
        }
        console.log(this.galleryProfiles);
        console.log('Logged in User: ', this.loggedinProfile);
      });
    }
    onLike(p: Profile) {
      if (!p.liked_by?.includes(this.loggedinProfile.username)) {
        p.liked_by?.push(this.loggedinProfile.username);
      }
      this.homeService.editProfileByUsername(p.username, p).subscribe((profile) => {
        console.log(profile);
      })
      console.log(this.galleryProfiles);
    }
  }