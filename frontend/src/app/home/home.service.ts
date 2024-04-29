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

  getMatchesofProfile(profile_id: number | undefined){
    return this.http.get<Match[]>(`http://localhost:8000/matches/profile/${profile_id}`)
  }

  getProfileById(id: number | undefined) {
    return this.http.get<Profile>(`http://localhost:8000/profiles/${id}`)
  }

  editName(id: number | undefined, newName: string){
    return this.http.put<Match>(`http://localhost:8000/matches/${id}`, { name: newName });
  }

  createMatch(match: Match) {
    return this.http.post<Match>(`http://localhost:8000/matches`, match);
  }

  setProfileId(profileId: number) {
    sessionStorage.setItem('profileId', profileId.toString());
  }

  getProfileId(): number | null {
    const profileId = sessionStorage.getItem('profileId');
    return profileId ? parseInt(profileId, 10) : null;
  }

  logOut() {
    sessionStorage.removeItem('profileId');
  }

  getProfileById2(id: number | null) {
    //Copied method that allows getProfileID() method as an arg.
    return this.http.get<Profile>(`http://localhost:8000/profiles/${id}`)
  }
}