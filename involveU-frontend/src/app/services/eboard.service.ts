import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { SocialMedia } from "../objects/social-media";
import {Club} from "../objects/club";
import {Observable} from "rxjs";
import {Events} from "../objects/events";


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
  //edits all club data for that club in one function
  editClubData(clubData: Club) {
    return this.http.put(environment.apiURL + `club/updateClubData`, clubData, {responseType: 'text'});
  }

  updateImage(clubID: number, file: File) {
    const data: FormData = new FormData();
    data.append('file', file);

    return this.http.put(environment.apiURL + `club/uploadNewLogo/${clubID}`,  data, {responseType: 'text'});
  }

  checkClubLogoPath(fileName:String, clubID:number)
  {
    return this.http.post(environment.apiURL + `club/CheckDBImageName/${fileName}/${clubID}`,{responseType: 'text'})
  }

  getClubEventInformation(clubID: number): Observable<Events[]> {
    return this.http.get<Events[]>(environment.apiURL + `events/getClubRsvpEventDetails/${clubID}`);
  }
}
