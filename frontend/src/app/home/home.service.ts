import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile, Match } from '../models.module';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(protected http: HttpClient) { }

  create(profile: Profile) {
    return this.http.post<Profile>('http://localhost:8000/profiles', profile);
  }

  getAllProfiles() {
    return this.http.get<Profile[]>('http://localhost:8000/profiles');
  }

  getProfileByUsername(username: string) {
    return this.http.get<Profile>(`http://localhost:8000/profiles/username/${username}`);
  }
}
