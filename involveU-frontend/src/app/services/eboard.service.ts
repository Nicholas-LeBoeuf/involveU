import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Announcement} from "../objects/announcements";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class EboardService {

  constructor(private http: HttpClient) { }

  createAnnouncement(newAnnouncement: Announcement) {
    return this.http.post(environment.apiURL + `announcements/createAnnouncements`, newAnnouncement, {responseType: 'text'});
  }

  getClubAnnouncements(clubID: number): Observable<Announcement[]>  {
    return this.http.get<Announcement[]>(environment.apiURL + `announcements/getClubAnnouncements/${clubID}`);
  }
}
