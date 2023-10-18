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

  constructor(private http: HttpClient) {}


  getUserProfile(UserID: number): Observable<User> {
    return this.http.get<User>(environment.apiURL + `user/getUserProfile/${UserID}`);
  }

  changeUserPronouns(UserID: number, Pronouns: string) {
    return this.http.put(environment.apiURL + `user/changePronouns/${UserID}`, {newPronouns: Pronouns});
  }

  changeUserCalendarColorSettings(UserID: number, ColorSetting: string)
  {
    return this.http.put(environment.apiURL + `user/changeUserCalendarColorSettings/${UserID}`, {newColor: ColorSetting});
  }

  checkUserPassword(UserID: number, password?: string): Observable<User> {
    return this.http.get<User>(environment.apiURL + `user/checkPassword/${UserID}/${password}`);
  }
}
