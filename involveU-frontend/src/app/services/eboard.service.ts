import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { SocialMedia } from "../objects/social-media";
import {Club} from "../objects/club";
import {Observable} from "rxjs";
import {Club} from "../objects/club";


@Injectable({
  providedIn: 'root'
})
export class EboardService {

  constructor(private http: HttpClient) { }

  getClubSocialMedia(clubID: number): Observable<SocialMedia[]> {
    return this.http.get<SocialMedia[]>(environment.apiURL + `club/getClubSocialMedia/${clubID}`);
  }

  deleteSocialMedia(socialMediaID: number) {
    return this.http.delete(environment.apiURL + `club/deleteClubSocialMedia/${socialMediaID}`, {responseType: 'text'});
  }

  addNewSocialMedia(socialMediaContent: SocialMedia) {
    return this.http.post(environment.apiURL + `club/insertNewSocialMedia`, socialMediaContent, {responseType: 'text'});
  }

  editSocialMedia(socialMediaContent: SocialMedia) {
    return this.http.put(environment.apiURL + `club/editSocialMedia`, socialMediaContent, {responseType: 'text'});
  }

  editClubData(clubData: Club) {
    return this.http.put(environment.apiURL + `club/updateClubData`, clubData, {responseType: 'text'});
  }
  updateImage(selectedClub: Club, file: File) {
    return this.http.put(environment.apiURL + `club/ChangeClubImage`, [selectedClub, file]);
  }
}
