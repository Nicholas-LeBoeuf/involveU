import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Events} from "../objects/events";
import {User} from "../objects/user";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) {}

  getTodaysEvents(): Observable<Events[]> {
    return this.http.get<Events[]>(environment.apiURL + `events/getTodaysEvents`);
  }
}