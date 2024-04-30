import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HomeService } from '../../home.service';
import { Profile, Match } from '../../../models.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'gallery',
    templateUrl: './gallery.widget.html',
    styleUrls: ['./gallery.widget.css'],
    imports: [MatCardModule, CommonModule, MatButtonModule, MatIconModule],
    providers: [HomeService],
    standalone: true
  })
  export class Gallery implements OnInit {
    galleryProfiles: Profile[] = []
    loggedinProfile: Profile;

    // @Output() matchCreated: EventEmitter<Match> = new EventEmitter();
    
    constructor(private homeService: HomeService, public snackBar: MatSnackBar){
      this.loggedinProfile = HomeService.loggedInUser;
    }
    ngOnInit(): void {
      const profileId = this.homeService.getProfileId();
      if (profileId) {
          this.homeService.getProfileById(profileId).subscribe((profile) => {
              this.loggedinProfile = profile;
              console.log('GETTING PROFILE FROM SESSION GALLERY:', this.loggedinProfile);
              this.loadProfiles();
          });
      } else {
          console.error("No profile ID found in session storage");
      }
    }

    loadProfiles() {
      if (this.loggedinProfile) {
          this.homeService.getAllProfiles().subscribe((profiles: Profile[]) => {
              this.galleryProfiles = profiles.filter((p) => {return (p.username !== this.loggedinProfile!.username
                && this.loggedinProfile!.preferences?.includes(p.gender)
                && !p.liked_by?.includes(this.loggedinProfile!.username))})
              // for (let p of profiles) {
              //     if (p.username !== this.loggedinProfile!.username
              //         && this.loggedinProfile!.preferences?.includes(p.gender)
              //         && !p.liked_by?.includes(this.loggedinProfile!.username)) {
              //         this.galleryProfiles.push(p);
              //     }
              // }
              console.log(this.galleryProfiles);
          });
      } else {
          console.error("Logged in profile is not available.");
      }
    }


    onLike(p: Profile) {
      if (!p.liked_by?.includes(this.loggedinProfile.username)) {
        p.liked_by?.push(this.loggedinProfile.username);
        // this.galleryProfiles.filter(obj => {return obj !== p});
      }
      this.homeService.editProfileByUsername(p.username, p).subscribe((profile) => {
        console.log(profile);
      })
      if (this.loggedinProfile.liked_by?.includes(p.username)) {
        const new_match: Match = {
          id: 100,
          profile_1: this.loggedinProfile,
          profile_2: p,
          compatibility: '',
          name: ''
        }
        this.snackBar.open('Match Created! Refresh Page', '', {
          duration: 2000
        });
        console.log(new_match);
        this.homeService.createMatch(new_match).subscribe();
      }
      // console.log(this.galleryProfiles);
      this.snackBar.open('You Liked!', '', {
        duration: 2000
      });
      setTimeout(() => {
        this.loadProfiles();
      }, 150);
    }
  }