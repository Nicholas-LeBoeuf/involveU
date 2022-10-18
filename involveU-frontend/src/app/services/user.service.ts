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

  checkLoginCredentials(username?: string, password?: string): Observable<User> {
    return this.http.get<User>(environment.apiURL + `user/checkCredentials/${username}/${password}`);
  }

  signupNewUser(newUser:User) {
    return this.http.post( environment.apiURL + `user/submitSignupInfo`, newUser);
  }
}
