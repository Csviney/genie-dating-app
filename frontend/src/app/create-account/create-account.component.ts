import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeService } from '../home/home.service';
import { HttpClientModule } from '@angular/common/http';
import { Profile } from '../models.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, 
  MatSelectModule, MatInputModule, MatCheckboxModule, ReactiveFormsModule, HttpClientModule],
  providers: [HomeService],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  accountForm = this.formBuilder.group({
    first_name: [''],
    last_name: [''],
    username: [''],
    password: [''],
    age: [null],
    gender: [''],
    preferences: this.formBuilder.array([])
  });

  constructor(private router: Router, private formBuilder: FormBuilder, 
    public snackBar: MatSnackBar, private homeService: HomeService) {}

    onClick() {
      if (this.accountForm.valid) {
        const formValue = this.accountForm.value;
        if (formValue.username) {
          this.homeService.checkUsernameExists(formValue.username).subscribe({
            next: (exists) => {
              if (exists) {
                this.snackBar.open('Username already exists', 'Close', { duration: 3000 });
              } else {
                this.createProfile(formValue);
                this.snackBar.open('Account Created!', 'Close', { duration: 3000 });
              }
            },
          });
        } else {
          console.log('Username is required');
        }
      } else {
        console.log('Form is not valid');
      }
    }
    
    createProfile(formValue: any) {
      const profileData: Profile = {
        username: formValue.username || '',
        password: formValue.password || '',
        first_name: formValue.first_name || '',
        last_name: formValue.last_name || '',
        age: formValue.age ?? 0,
        gender: formValue.gender as string,
        preferences: formValue.preferences as string[],
        liked_by: []
      };
    
      this.homeService.create(profileData).subscribe({
        next: (response) => {
          console.log('Profile created:', response);
          HomeService.loggedInUser = response;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error creating profile:', error);
          this.snackBar.open('Failed to create account', 'Close', { duration: 3000 });
        }
      });
    }
    



  onCheckboxChange(e: MatCheckboxChange) {
    const preferences: FormArray = this.accountForm.get('preferences') as FormArray;

    if (e.checked) {
      preferences.push(new FormControl(e.source.value));
    } else {
      const index = preferences.controls.findIndex(x => x.value === e.source.value);
      preferences.removeAt(index);
    }
  }
  
}
