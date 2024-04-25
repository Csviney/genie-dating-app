import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'gallery',
    templateUrl: './gallery.widget.html',
    styleUrls: ['./gallery.widget.css'],
    imports: [MatCardModule],
    standalone: true
  })
  export class Gallery {

  }