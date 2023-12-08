import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Club} from "../objects/club";
import {User} from "../objects/user";
import {ClubMembers} from "../objects/club-members";

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private http: HttpClient ) { }

  getAllClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(environment.apiURL + `clubs`);
  }

  favoriteClub(ID: number, clubID: number) {
    return this.http.get(environment.apiURL + `club/submitFavorite/${ID}/${clubID}`, {responseType: 'text'});
  }

  unfavoriteClub(clubID: number, id: number) {
    return this.http.get(environment.apiURL + `club/removeFavorites/${clubID}/${id}`, {responseType: 'text'});
  }

  getUsersFavoritedClubs(ID: number): Observable<Club[]> {
    return this.http.get<Club[]>(environment.apiURL + `club/getUserFavorites/${ID}`);
  }

  getSpecificClub(id: number): Observable<Club> {
    return this.http.get<Club>(environment.apiURL + `club/${id}`);
  }

  getClubEboard(clubID: number): Observable<User[]> {
    return this.http.get<User[]>(environment.apiURL + `club/getClubsEboard/${clubID}`);
  }

  checkIfEboard(userID: number): Observable<any> {
    return this.http.get<any>(environment.apiURL + `club/checkIfEboard/${userID}`);
  }

  getClubLogo(clubID : number){
    return this.http.get(environment.apiURL + `club/getClubLogo/${clubID}`, {responseType: 'blob'});
  }

  getMembersOfClub(clubID : number): Observable<User[]> {
    return this.http.get<User[]>(environment.apiURL + `club/favoriteUsers/${clubID}`);
  }

  getCountOfClub(clubID : number): Observable<number> {
   return this.http.get<number>(environment.apiURL + `club/favoriteCount/${clubID}`);
  }


}
