import { Component } from '@angular/core';
import { Matches } from './widgets/matches/matches.widget';
import { Gallery } from './widgets/gallery/gallery.widget';
import { Profile } from './widgets/profile/profile.widget';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [MatCardModule],
  standalone: true
})
export class HomeComponent {
 constructor(){}
}
