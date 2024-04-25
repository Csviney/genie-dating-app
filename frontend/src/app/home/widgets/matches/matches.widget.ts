import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'matches',
    templateUrl: './matches.widget.html',
    styleUrls: ['./matches.widget.css'],
    imports: [MatCardModule],
    standalone: true
  })
  export class Matches {

  }