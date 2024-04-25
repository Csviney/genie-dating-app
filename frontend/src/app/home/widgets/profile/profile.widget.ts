import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'profile',
    templateUrl: './profile.widget.html',
    styleUrls: ['./profile.widget.css'],
    imports: [MatCardModule],
    standalone: true
  })
  export class Profile {

  }