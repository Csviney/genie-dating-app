import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HomeService } from '/workspaces/genie-dating-app/frontend/src/app/home/home.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Profile } from '../../../models.module';
import { CommonModule } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';


@Component({
    selector: 'profile',
    templateUrl: './profile.widget.html',
    styleUrls: ['./profile.widget.css'],
    providers: [HomeService],
    imports: [
      CommonModule,
      MatCardModule,
      HttpClientModule,
      FormsModule,
      MatIconModule,
      MatOption,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule
    ],
    standalone: true
  })

  export class ProfileWidget implements OnInit {
    loggedinProfile: Profile;
    preferencesString: string = '';
    editingStates: { [field: string]: boolean } = {};
  
    constructor(private homeService: HomeService, private http: HttpClient, private router: Router) {
      this.loggedinProfile = HomeService.loggedInUser;
    }
  
    ngOnInit(): void {
      console.log("hit")
      const profileId = this.homeService.getProfileId();
      if (profileId) {
        this.homeService.getProfileById(profileId).subscribe((profile) => {
          this.loggedinProfile = profile;
          console.log('GETTING PROFILE FROM SESSION:', this.loggedinProfile);
        });
      } else {
        console.error("No profile ID found in session storage");
      }
    }

    isEditMode(field: string): boolean {
      return !!this.editingStates[field];
    }

    toggleEditMode(field: string): void {
      this.editingStates[field] = !this.editingStates[field];
    }

    saveChanges(): void {
      console.log('IN SAVEDCHANGES')
      this.toggleEditMode('gender');
      this.toggleEditMode('preferences');
      this.updateProfile();
    }
  
    updateProfile(): void {
      // Log the updated profile before sending to the backend
      console.log('Profile to be updated:', this.loggedinProfile);

      this.homeService.editProfileByUsername(this.loggedinProfile.username, this.loggedinProfile).subscribe((profile) => {
        console.log(profile);
      })
    }

    deleteProfile(): void {
      if (confirm('Are you sure you want to delete your profile?')) {
          this.homeService.deleteProfile(this.loggedinProfile.username).subscribe((profile) => {
              console.log(profile);
          })
      }
      this.router.navigateByUrl('/').then(() => {
        // Force a reload of the page
        window.location.reload();
      });
    }
    
  }