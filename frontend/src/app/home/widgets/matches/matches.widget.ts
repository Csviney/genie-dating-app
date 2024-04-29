import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HomeService } from '../../home.service';
import { HttpClientModule } from '@angular/common/http';
import { Profile, Match } from '../../../models.module';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@Component({
    selector: 'matches',
    templateUrl: './matches.widget.html',
    styleUrls: ['./matches.widget.css'],
    imports: [MatCardModule, HttpClientModule, CommonModule, FormsModule, MatIconModule, MatFormFieldModule,
      MatInputModule],
    providers: [HomeService],
    standalone: true
  })
  export class Matches implements OnInit {
    loggedinProfile: Profile;
    matches: Match[] = [];
    editingStates: { [matchId: number]: boolean } = {};
  
    constructor(private homeService: HomeService) {
      this.loggedinProfile = HomeService.loggedInUser as Profile;
    }
  
    ngOnInit(): void {
      const profileId = this.homeService.getProfileId();
      if (profileId) {
          this.homeService.getProfileById(profileId).subscribe({
              next: (profile) => {
                  this.loggedinProfile = profile;
                  console.log('GETTING PROFILE FROM SESSION MATCHES WIDGET', profile);
                  this.fetchMatches();
              },
              error: (error) => {
                  console.error('Error fetching profile', error);
              }
          });
      } else {
          console.error("No profile ID found in session storage");
      }
    }

    fetchMatches(): void {
      if (this.loggedinProfile) {
          this.homeService.getMatchesofProfile(this.loggedinProfile.id).subscribe({
              next: (matches) => {
                  this.matches = matches;
                  console.log('logged ID,', this.loggedinProfile!.id);
                  console.log('matches in observable,', matches);
              },
              error: (error) => {
                  console.error('Error fetching matches', error);
              }
          });
      }
    }
    
    toggleEditMode(matchId: number): void {
      if (this.isEditMode(matchId)) {
        let match = this.matches.find(m => m.id === matchId);
        if (match) {
          this.homeService.editName(match.id, match.name).subscribe({
            next: (updatedMatch) => {
              console.log('Name updated successfully', updatedMatch);
            },
            error: (error) => {
              console.error('Failed to update name', error);
            }
          });
        }
      }
      this.editingStates[matchId] = !this.editingStates[matchId];
    }
    
  
    isEditMode(matchId: number): boolean {
      return !!this.editingStates[matchId];
    }
  }