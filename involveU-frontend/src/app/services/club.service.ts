import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Club} from "../objects/club";

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

  getTopClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(environment.apiURL + `club/getTopFavorite`);
  }

  getUsersFavoritedClubs(ID: number): Observable<Club[]> {
    return this.http.get<Club[]>(environment.apiURL + `club/getUserFavorites/${ID}`);
  }

  getSpecificClub(id: number): Observable<Club> {
    return this.http.get<Club>(environment.apiURL + `club/${id}`);
  }

  unfavoriteClub(clubID: number, id: number) {
    return this.http.get(environment.apiURL + `club/removeFavorites/${clubID}/${id}`);
  }
}
