import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpResponse} from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '../objects/user'
import {Login} from "../objects/login";
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
}
