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

  getMatchesofProfile(profile_id: number | undefined){
    return this.http.get<Match[]>(`http://localhost:8000/matches/profile/${profile_id}`)
  }

  getProfileById(id: number | undefined) {
    return this.http.get<Profile>(`http://localhost:8000/profiles/${id}`)
  }

  editName(id: number | undefined, newName: string){
    return this.http.put<Match>(`http://localhost:8000/matches/${id}`, { name: newName });
  }
}
