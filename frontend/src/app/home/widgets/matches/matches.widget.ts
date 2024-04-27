import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HomeService } from '../../home.service';
import { HttpClientModule } from '@angular/common/http';
import { Profile, Match } from '../../../models.module';


@Component({
    selector: 'matches',
    templateUrl: './matches.widget.html',
    styleUrls: ['./matches.widget.css'],
    imports: [MatCardModule, HttpClientModule],
    providers: [HomeService],
    standalone: true
  })
  export class Matches {

  }