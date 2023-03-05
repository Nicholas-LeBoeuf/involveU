import { Injectable } from '@angular/core';
//import {environment} from "../../environments/environment";
import {environment} from "../../environments/environment.prod";
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Club} from "../objects/club";
import {Eboard} from "../objects/Eboard";
import {User} from "../objects/user";

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient ) { }

  getAllClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(environment.apiURL + `clubs`);
  }

  favoriteClub(ID: number, clubID: number) {
    return this.http.get(environment.apiURL + `club/submitFavorite/${ID}/${clubID}`);
  }

  getUsersFavoritedClubs(ID: number): Observable<Club[]> {
    return this.http.get<Club[]>(environment.apiURL + `club/getUserFavorites/${ID}`);
  }

  getSpecificClub(id: number): Observable<Club> {
    return this.http.get<Club>(environment.apiURL + `club/${id}`);
  }

  unfavoriteClub(clubID: number, id: number) {
    return this.http.get(environment.apiURL + `club/removeFavorites/${clubID}/${id}`, {responseType: 'text'});
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
}
