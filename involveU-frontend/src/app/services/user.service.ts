import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '../objects/user'
import {LoginReturn} from "../objects/login-return";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(environment.apiURL + `user/test`);
  }

  checkLoginCredentials(username?: string, password?: string) {
    return this.http.get<LoginReturn>(environment.apiURL + `user/checkCredentials/${username}/${password}`);
  }

  signupNewUser(userInfo: User) {
    let queryParams = new HttpParams();
    queryParams  = queryParams.append('firstName', userInfo.firstName);
    queryParams  = queryParams .append('lastName', userInfo.lastName);
    queryParams  = queryParams .append('year', userInfo.year);
    queryParams  = queryParams .append('email', userInfo.email);
    queryParams  = queryParams .append('pronouns', userInfo.pronouns);
    queryParams = queryParams .append('isAdmin', userInfo.isAdmin);
    queryParams  = queryParams .append('isEboard', userInfo.isEboard);
    queryParams = queryParams .append('userPassword', userInfo.userPassword);
    console.log(queryParams );
    return this.http.post(environment.apiURL + `user/submitSignupInfo/userInfo`, {params: queryParams});
  }
}
