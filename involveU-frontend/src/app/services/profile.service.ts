import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '../objects/user'
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }


  getUserProfile(UserID: number): Observable<User[]> {
    return this.http.get<User[]>(environment.apiURL + `user/GetUserProfile/${UserID}`);
  }

  changeUserPronouns(UserID: number): Observable<User[]> {
    return this.http.get<User[]>(environment.apiURL + `user/changePronouns/${UserID}`);
  }

  checkUserPassword(UserID: number, password?: string): Observable<User> {
    return this.http.get<User>(environment.apiURL + `user/checkPassword/${UserID}/${password}`);
  }
}
