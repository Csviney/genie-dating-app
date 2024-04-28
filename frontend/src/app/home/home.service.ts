import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile, Match } from '../models.module';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public static loggedInUser: any = null;

  constructor(protected http: HttpClient) {}

  create(profile: Profile) {
    return this.http.post<Profile>('http://localhost:8000/profiles', profile);
  }

  getAllProfiles() {
    return this.http.get<Profile[]>('http://localhost:8000/profiles');
  }

  getProfileByUsername(username: string) {
    return this.http.get<Profile>(`http://localhost:8000/profiles/username/${username}`);
  }

  checkUsernameExists(username: string){
    return this.http.get<Boolean>(`http://localhost:8000/check-username/${username}`);
  }

  editProfileByUsername(username: string, profile: Profile) {
    return this.http.put<Profile>(`http://localhost:8000/profiles/username/${username}`, profile);
  }
}
