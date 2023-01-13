import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Events} from "../objects/events";
import {User} from "../objects/user";
import {environment} from "../../environments/environment";
import {Event} from "@angular/router";

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

  rsvpToEvent(eventID: number, userID: number) {
    return this.http.get(environment.apiURL + `events/rsvpEvent/${eventID}/${userID}`);
  }

  removeEventRSVP(eventID: number, userID: number) {
    return this.http.get(environment.apiURL + `events/removeRsvpEvent/${eventID}/${userID}`);
  }

  submitNewEvent(event: Events)
  {
    return this.http.post(environment.apiURL +`events/createNewEvent/`, event, {responseType: 'text'} );
  }

  updateEvent(event: Events)
  {
    return this.http.post(environment.apiURL + `events/updateEvents`, event, {responseType: 'text'});
  }

  deleteEvent(eventID: number) {
    return this.http.get(environment.apiURL + `events/deleteEvent/${eventID}`);
  }

  getSpecificEvent(eventID: number): Observable<Events> {
    return this.http.get<Events>(environment.apiURL + `events/getSpecificEvent/${eventID}`);
  }

  getFutureFavortedClubEvents(userID: number): Observable<Events[]> {
    return this.http.get<Events[]>(environment.apiURL + `events/getFutureFavoriteClubEvents/${userID}`);
  }
  getLocations(): Observable<Events[]> {
    return this.http.get<Events[]>(environment.apiURL + `events/getAllLocations`);
  }
  getSpaceByLocation(locationID: number): Observable<Events[]> {
    return this.http.get<Events[]>(environment.apiURL + `events/getSpacesByLocation/${locationID}`);
  }
}
