import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Club} from "../objects/club";
import {User} from "../objects/user";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  insertNewClub(newClub: Club) {
    return this.http.post(environment.apiURL + `club/insertClub`, newClub, {responseType: 'text'});
  }

  createUser(newUser: User){
    return this.http.post(environment.apiURL + `admin/createUser`, newUser, {responseType: 'text'});
  }

  deleteUser(userID: number){
    return this.http.get(environment.apiURL + `admin/deleteUser/${userID}`);
  }

  assignNewAdvisor(advisorID: number, clubID: number){
    return this.http.get(environment.apiURL + `admin/assignNewAdvisor/${advisorID}/${clubID}`, {responseType: 'text'});
  }

  addEBoardMember(userID: number, clubID: number, role: string) {
    return this.http.get(environment.apiURL + `admin/addNewEboard/${userID}/${clubID}/${role}`, {responseType: 'text'});
  }

  removeEBoardMember(userID: number){
    return this.http.get(environment.apiURL + `admin/deleteEboard/${userID}`, {responseType: 'text'});
  }
}
