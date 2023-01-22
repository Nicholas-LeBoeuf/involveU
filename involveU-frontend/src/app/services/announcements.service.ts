import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Announcement} from "../objects/announcements";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {

  constructor(private http: HttpClient) { }

  createAnnouncement(newAnnouncement: Announcement) {
    return this.http.post(environment.apiURL + `announcements/createAnnouncements`, newAnnouncement, {responseType: 'text'});
  }

  getClubAnnouncements(clubID: number) {
    return this.http.get(environment.apiURL + `announcements/getClubAnnouncements/${clubID}`);
  }

}
