import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '../objects/user'
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  checkLoginCredentials(username?: string, password?: string): Observable<User> {
    return this.http.get<User>(environment.apiURL + `user/checkCredentials/${username}/${password}`);
  }

  signupNewUser(newUser:User) {
    return this.http.post( environment.apiURL + `user/submitSignupInfo`, newUser);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiURL + `user/getAllUsers`);
  }

  getAllFaculty(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiURL + `user/getAllFaculty`);
  }

  sendEmail(recipient?:string, securityCode?:number){
    return this.http.get(environment.apiURL + `email/sendMail/${recipient}/${securityCode}`, {responseType: 'text'});
  }
}
