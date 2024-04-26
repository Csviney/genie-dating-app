import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from './widgets/profile/profile.widget';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(protected http: HttpClient) { }

  create(profile: Profile) {
    return this.http.post<Profile>('http://localhost:8000/profiles', profile)
  }

  getAllProfiles() {
    return this.http.get<Profile[]>('http://localhost:8000/profiles')
  }
}
