import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Events} from "../objects/events";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) {
  }

  getAllEvents(): Observable<Events[]> {
    return this.http.get<Events[]>(environment.apiURL + `events/getAllEvents`);
  }

  getTodaysEvents(): Observable<Events[]> {
    return this.http.get<Events[]>(environment.apiURL + `events/getTodaysEvents`);
  }

  getFavoritedClubsEvents(userID: number): Observable<Events[]> {
    return this.http.get<Events[]>(environment.apiURL + `events/getFavoriteClubEvents/${userID}`);
  }

  getAllFutureEvents(): Observable<Events[]> {
    return this.http.get<Events[]>(environment.apiURL + `events/getFutureEvents`);
  }

  getSpecificClubEvents(clubID: number): Observable<Events[]> {
    return this.http.get<Events[]>(environment.apiURL + `events/getClubEvents/${clubID}`);
  }

  getUserRSVPdEvents(userID: number): Observable<Events[]> {
    return this.http.get<Events[]>(environment.apiURL + `events/getUserRsvpEvent/${userID}`);
  }

  getUserFutureRSVPdEvents(userID: number): Observable<Events[]> {
    return this.http.get<Events[]>(environment.apiURL + `events/getUserFutureRsvpEvents/${userID}`);
  }

  rsvpToEvent(eventID: number, userID: number,clubID: number) {
    return this.http.get(environment.apiURL + `events/rsvpEvent/${eventID}/${userID}/${clubID}`, {responseType: 'text'});
  }

  removeEventRSVP(eventID: number, userID: number) {
    return this.http.get(environment.apiURL + `events/removeRsvpEvent/${eventID}/${userID}`, {responseType: 'text'});
  }

  getSpecificEvent(eventID: number): Observable<Events> {
    return this.http.get<Events>(environment.apiURL + `events/getSpecificEvent/${eventID}`);
  }

  getFutureFavortedClubEvents(userID: number): Observable<Events[]> {
    return this.http.get<Events[]>(environment.apiURL + `events/getFutureFavoriteClubEvents/${userID}`);
  }

  getTopRSVP():Observable<Events[]> {
    return this.http.get<Events[]>(environment.apiURL + `events/getTopRSVP`);
  }

  getCountOfRSVP(eventID: number){
    return this.http.get<number>(environment.apiURL + `event/rsvpCount/${eventID}`);

  }
}
