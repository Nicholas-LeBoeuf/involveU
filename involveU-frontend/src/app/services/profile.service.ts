import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '../objects/user'
import {environment} from "../../environments/environment";
import {Club} from "../objects/club";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }


  getUserProfile(UserID: number): Observable<User> {
    return this.http.get<User>(environment.apiURL + `user/getUserProfile/${UserID}`);
  }

  changeUserPronouns(UserID: number, Pronouns: string) {
    return this.http.put(environment.apiURL + `user/changePronouns/${UserID}`, Pronouns);
  }

  changeUserYear(UserID: number, newYear: string) {
    return this.http.put(environment.apiURL + `user/changeYear/${UserID}/${newYear}`, {});
  }

  changeUserCalendarColorSettings(UserID: number, ColorSetting: string) {
    return this.http.put(environment.apiURL + `user/changeUserCalendarColorSettings/${UserID}`, {newColor: ColorSetting});
  }

  checkUserPassword(UserID: number, password?: string): Observable<User> {
    return this.http.get<User>(environment.apiURL + `user/checkPassword/${UserID}/${password}`);
  }

  uploadProfilePicture(userID: number, formData: FormData) {
    return this.http.put(environment.apiURL + `user/uploadProfilePicture/${userID}`, formData);
  }

  downloadUserProfilePicture(userID: number): Observable<Blob> {
    return this.http.get(`${environment.apiURL}/user/getProfilePicture/${userID}`, { responseType: 'blob' });
  }
}
