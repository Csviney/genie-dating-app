import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from '../home/home.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, 
  ReactiveFormsModule, HttpClientModule, MatInputModule],
  providers: [HomeService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    username: [''],
    password: ['']
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    public snackBar: MatSnackBar
  ) {}

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
  
      if (typeof username === 'string' && username.trim() !== '') {
        this.homeService.getProfileByUsername(username).subscribe({
          next: (profile) => {
            console.log(profile);
            if (profile.password === password) {
              if (profile.id) {
                this.homeService.setProfileId(profile.id);
              }
              this.router.navigate(['/home']);
            } else {
              this.snackBar.open('Wrong Password', '', {
                duration: 2000
              });              
            }
          },
          error: (error) => {
            this.snackBar.open('Wrong username', '', {
              duration: 2000
            });            
          }
        });
      }
    }
  }
  

  onClick2(){
    this.router.navigate(['/create']);
  }
}
