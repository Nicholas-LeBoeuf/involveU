import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Announcement} from "../objects/announcements";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {

  constructor(private http: HttpClient) { }

  createAnnouncement(newAnnouncement: Announcement) {
    return this.http.post(environment.apiURL + `announcements/createAnnouncements`, newAnnouncement, {responseType: 'text'});
  }

  getClubAnnouncements(clubID: number):Observable<Announcement[]> {
    return this.http.get<Announcement[]>(environment.apiURL + `announcements/getClubAnnouncements/${clubID}`);
  }

  updateAnnouncement(updatedAnnouncement: Announcement) {
    return this.http.post(environment.apiURL + `announcements/editAnnouncements`, updatedAnnouncement, {responseType: 'text'});
  }

  deleteAnnouncement(announcementID: number) {
    return this.http.get(environment.apiURL + `announcements/deleteAnnouncement/${announcementID}`);
  }

}
