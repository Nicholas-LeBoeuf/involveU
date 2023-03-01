import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { SocialMedia } from "../objects/social-media";
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
    return this.http.delete(environment.apiURL + `club/deleteClubSocialMedia/${socialMediaID}`);
  }

  addNewSocialMedia(socialMediaContent: SocialMedia) {
    return this.http.post(environment.apiURL + `club/insertNewSocialMedia`, socialMediaContent);
  }

  editSocialMedia(socialMediaContent: SocialMedia) {
    return this.http.put(environment.apiURL + `club/editSocialMedia`, socialMediaContent);
  }

  editClubData(clubData: Club) {
    return this.http.put(environment.apiURL + `club/updateClubData`, clubData);
  }
}
