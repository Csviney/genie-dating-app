import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Profile } from '../home/widgets/profile/profile.widget';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeService } from '../home/home.service';
import { HttpClientModule } from '@angular/common/http';

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

  constructor(private router: Router, private formBuilder: FormBuilder, private homeService: HomeService) {}

  onClick(){
    if (this.accountForm.valid) {
      console.log('Form Values:', this.accountForm.value);
    } else {
      console.log('Form is not valid');
    }
    this.homeService.create(this.accountForm.value).subscribe();
    this.router.navigate(['/home'])

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
